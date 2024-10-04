"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
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
import { childVariants, parentVariants } from "@/constants/motion";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/app.provider";
import { LoginRequest, LoginRequestType } from "@/schemas/auth";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const { setUser } = useAppContext();

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

      const { accessToken, name, avatar } = result.payload.data;

      localStorage.setItem("user", JSON.stringify({ name, avatar }));

      setUser({ name, avatar });

      await authApi.auth({ sessionToken: accessToken });

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
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-5"
        initial="hidden"
        animate="show"
        variants={parentVariants}
      >
        <motion.div variants={childVariants}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={childVariants}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          className="flex-between max-sm:flex-col max-sm:gap-5"
          variants={childVariants}
        >
          <span className="text-sm">
            Don&apos;t have account?{" "}
            <Link href="/register" className="text-blue-500">
              <span className="hover:underline">Register</span>
            </Link>
          </span>

          <span className="text-sm text-blue-500">Forgot Password?</span>
        </motion.div>

        <motion.div
          className="flex justify-end max-sm:justify-center"
          variants={childVariants}
        >
          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting || isFormValuesEmpty || loading
            }
          >
            Submit
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
};
export default LoginForm;
