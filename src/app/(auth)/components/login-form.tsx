"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import authApi from "@/apis/auth.api";
import categoryApi from "@/apis/category.api";
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
import { LoginBody, LoginBodyType } from "@/schemas/auth.schema";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isFormValuesEmpty = Object.values(form.getValues()).some(
    (value) => value === ""
  );

  const onSubmit = async (values: LoginBodyType) => {
    setLoading(true);
    try {
      const result = await authApi.login(values);

      await authApi.auth({ sessionToken: result.payload.data.accessToken });

      const categoryIds = localStorage.getItem("categories");

      if (categoryIds) {
        await categoryApi
          .selectInterestedCategory({
            categoryIds: JSON.parse(categoryIds as string),
          })
          .then(() => {
            localStorage.removeItem("categories");
          });
      }

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-5">
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
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-sm">Remember me</span>
          </div>

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
