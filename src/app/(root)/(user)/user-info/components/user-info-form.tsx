"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { vi } from "date-fns/locale";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import userApi from "@/apis/user.api";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENDERS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AccountRequest, AccountRequestType, AccountType } from "@/schemas";

const UserInfoForm = ({ data }: { data: AccountType }) => {
  const tMessages = useTranslations("messages");
  const tUserInfoPage = useTranslations("userInfoPage");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AccountRequestType>({
    resolver: zodResolver(AccountRequest),
    defaultValues: {
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      dob: data.dob ? new Date(Number(data.dob)) : undefined,
      addressBase: data.addressBase || "",
      addressDetail: data.addressDetail || "",
    },
  });

  const onSubmit = async (values: AccountRequestType) => {
    try {
      setLoading(true);

      await userApi.updateMe(values);

      toast({
        title: tMessages("success"),
        description: tMessages("updateUserInfoSuccess"),
      });

      router.refresh();
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 rounded-xl bg-white p-10 shadow-xl max-xl:w-full max-lg:w-full max-sm:mx-5 max-sm:px-5"
      >
        <div className="grid-cols-2 gap-x-10 gap-y-5 max-lg:space-y-5 lg:grid">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{tUserInfoPage("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={tUserInfoPage("email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{tUserInfoPage("fullname")}</FormLabel>
                <FormControl>
                  <Input placeholder={tUserInfoPage("fullname")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{tUserInfoPage("phone")}</FormLabel>
                <FormControl>
                  <Input placeholder={tUserInfoPage("phone")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{tUserInfoPage("gender")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn("text-sm", {
                        "text-muted-foreground": !field.value,
                      })}
                    >
                      <SelectValue placeholder={tUserInfoPage("gender")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(GENDERS).map((item) => (
                      <SelectItem key={item} value={item}>
                        {tUserInfoPage(item.toLowerCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="dob">
                  {tUserInfoPage("dateOfBirth")}
                </FormLabel>
                <FormControl>
                  <DateTimePicker
                    id="date-of-birth"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={tUserInfoPage("dateOfBirth")}
                    displayFormat={{ hour24: "dd/MM/yyyy" }}
                    granularity="day"
                    limitToCurrent={true}
                    locale={vi}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tUserInfoPage("addressBase")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tUserInfoPage("addressBase")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressDetail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tUserInfoPage("addressDetail")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tUserInfoPage("addressDetail")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            type="submit"
            disabled={
              loading || form.formState.isSubmitting || !form.formState.isDirty
            }
          >
            {loading ? <Loader /> : tUserInfoPage("update")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UserInfoForm;
