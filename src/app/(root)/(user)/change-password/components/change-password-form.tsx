"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ChangePasswordRequest,
  ChangePasswordRequestType,
} from "@/schemas/auth";

const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordRequestType>({
    resolver: zodResolver(ChangePasswordRequest),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ChangePasswordRequestType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 space-y-5 rounded-xl bg-white p-10 shadow-xl max-xl:w-full max-sm:mx-5 max-sm:px-5"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Old Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="old password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="confirm password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
export default ChangePasswordForm;
