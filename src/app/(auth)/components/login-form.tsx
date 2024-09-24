"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoginRequest, LoginRequestType } from "@/schemas/auth";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<LoginRequestType>({
    resolver: zodResolver(LoginRequest),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isFormValuesEmpty = Object.values(form.getValues()).some(
    (value) => value === ""
  );

  const onSubmit = async (values: LoginRequestType) => {
    setLoading(true);
    try {
      const result = await authApi.login(values);

      await authApi.auth({ sessionToken: result.payload.data.accessToken });

      toast({
        title: "Success",
        description: "Login successfully!",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-between">
          <span className="text-sm">
            Don&apos;t have account?{" "}
            <Link href="/register" className="text-blue-500">
              <span className="hover:underline">Register</span>
            </Link>
          </span>

          <span className="text-sm text-blue-500">Forgot Password?</span>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting || isFormValuesEmpty || loading
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default LoginForm;
