"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import DateInput from "@/components/date-input";
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
import { cn, convertToCapitalizeCase } from "@/lib/utils";
import { Account, AccountType } from "@/schemas";

const UserInfoForm = ({ data }: { data: AccountType }) => {
  const [verified] = useState(false);

  const defaultDob = new Date(Number(data.dob));

  const form = useForm<AccountType>({
    resolver: zodResolver(Account),
    defaultValues: {
      ...data,
      dob: defaultDob,
      addressBase: data.addressBase || "",
      addressDetail: data.addressDetail || "",
    },
  });

  const onsubmit = (values: AccountType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
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
                  <DateInput id="dob" defaultValue={defaultDob} {...field} />
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
export default UserInfoForm;
