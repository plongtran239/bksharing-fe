"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import userApi from "@/apis/user.api";
import Loader from "@/components/loader";
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
import { useToast } from "@/hooks/use-toast";
import { ChangePasswordRequest, ChangePasswordRequestType } from "@/schemas";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ChangePasswordRequestType>({
    resolver: zodResolver(ChangePasswordRequest),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordRequestType) => {
    try {
      setLoading(true);

      await userApi.changePassword(values);

      form.reset();

      toast({
        title: "Success",
        description: "Change password successfully",
      });
    } catch (error) {
      console.error({ error });

      toast({
        title: "Error",
        description: (
          error as {
            payload: {
              message: string;
            };
          }
        ).payload.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 space-y-5 rounded-xl bg-white p-10 shadow-xl max-xl:w-full max-sm:mx-5 max-sm:px-5"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Current Password</FormLabel>
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
          <Button
            type="submit"
            disabled={
              !form.formState.isValid || form.formState.isSubmitting || loading
            }
          >
            {loading ? <Loader /> : "Change Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ChangePasswordForm;
