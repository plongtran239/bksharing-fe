"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import userApi from "@/apis/user.api";
import DateInput from "@/components/date-input";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
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
import {
  cn,
  convertDateToLocaleDateString,
  convertToCapitalizeCase,
} from "@/lib/utils";
import { Account, AccountType } from "@/schemas";

const UserInfoForm = ({ data }: { data: AccountType }) => {
  const [verified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AccountType>({
    resolver: zodResolver(Account),
    defaultValues: {
      ...data,
      dob: data.dob ? new Date(Number(data.dob)) : undefined,
      addressBase: data.addressBase || "",
      addressDetail: data.addressDetail || "",
    },
  });

  const onSubmit = async (values: AccountType) => {
    try {
      setLoading(true);

      await userApi.updateMe(values);

      toast({
        title: "Success",
        description: "Your information has been updated",
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
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="mt-7 flex items-center gap-2">
            {verified ? (
              <>
                <CheckCircleIcon size={20} className="text-green-500" />
                Your email is verified
              </>
            ) : (
              <>
                <XCircleIcon size={20} className="text-red-500" />
                Your email is not verified
              </>
            )}
          </p>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="fullname" {...field} />
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
                <FormLabel required>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="phone" {...field} />
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
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn("text-sm", {
                        "text-muted-foreground": !field.value,
                      })}
                    >
                      <SelectValue placeholder="select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(GENDERS).map((item) => (
                      <SelectItem key={item} value={item}>
                        {convertToCapitalizeCase(item)}
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
                <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                <FormControl>
                  <DateInput
                    id="dob"
                    defaultValue={
                      field.value
                        ? convertDateToLocaleDateString(
                            new Date(Number(field.value))
                          )
                        : ""
                    }
                    {...field}
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
                <FormLabel>Address Base</FormLabel>
                <FormControl>
                  <Input placeholder="base" {...field} />
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
                <FormLabel>Address Detail</FormLabel>
                <FormControl>
                  <Input placeholder="detail" {...field} />
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
            {loading ? <Loader /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UserInfoForm;
