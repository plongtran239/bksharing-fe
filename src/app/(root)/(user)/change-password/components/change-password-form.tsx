"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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
  const tMessages = useTranslations("messages");
  const tChangePasswordPage = useTranslations("changePasswordPage");
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
        title: tMessages("success"),
        description: tChangePasswordPage("changePasswordSuccess"),
      });
    } catch (error) {
      console.error({ error });

      toast({
        title: tMessages("error"),
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
              <FormLabel required>{tChangePasswordPage("current")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={tChangePasswordPage("current")}
                  {...field}
                />
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
              <FormLabel required>{tChangePasswordPage("new")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={tChangePasswordPage("new")}
                  {...field}
                />
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
              <FormLabel required>{tChangePasswordPage("confirm")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={tChangePasswordPage("confirm")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-center">
          <Button
            type="submit"
            disabled={
              !form.formState.isDirty || form.formState.isSubmitting || loading
            }
          >
            {loading ? <Loader /> : tChangePasswordPage("change")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ChangePasswordForm;
