"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import authApi from "@/apis/auth.api";
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
import {
  ResetPasswordRequest,
  ResetPasswordRequestType,
} from "@/schemas/reset-password.schema";

const ResetPassword = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const token = pathname.split("/")[2];

  const form = useForm<ResetPasswordRequestType>({
    resolver: zodResolver(ResetPasswordRequest),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async () => {
    try {
      await authApi.resetPassword({
        token,
        password: form.getValues("newPassword"),
      });

      toast({
        title: "Thành công",
        description: "Mật khẩu đã được đặt lại",
      });

      router.push("/login");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="w-[600px] space-y-10 rounded-xl p-10 shadow-2xl">
      <div className="flex-between">
        <div
          onClick={() => router.replace("/login")}
          className="cursor-pointer"
        >
          <ArrowLeftIcon size={24} className="text-primary" />
        </div>
        <h1 className="text-2xl text-primary">Đặt lại mật khẩu</h1>
        <div></div>
      </div>

      <div className="space-y-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Mật khẩu mới"
                      type="password"
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
                  <FormLabel required>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Xác nhận mật khẩu"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Đặt lại mật khẩu
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;
