"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { childVariants, parentVariants } from "@/constants/motion";
import { useLogin } from "@/hooks/use-login";
import { LoginRequest, LoginRequestType } from "@/schemas";

const LoginForm = () => {
  const t = useTranslations("authPage.login");
  const router = useRouter();

  const { login, loading } = useLogin();

  const form = useForm<LoginRequestType>({
    resolver: zodResolver(LoginRequest),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginRequestType) => {
    login(values);
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
                <FormLabel required>{t("email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("email")} {...field} />
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
                <FormLabel required>{t("password")}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={t("password")} {...field} />
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
            {t("dontHaveAccount")}
            <Button
              type="button"
              variant="link"
              className="px-1 py-0"
              onClick={() => router.push("/register")}
            >
              {t("register")}
            </Button>
          </span>

          <Button
            type="button"
            variant="link"
            className="p-0"
            onClick={() => router.push("/reset-password")}
          >
            {t("forgotPassword")}
          </Button>
        </motion.div>

        <motion.div
          className="flex justify-end max-sm:justify-center"
          variants={childVariants}
        >
          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting || !form.formState.isDirty || loading
            }
          >
            {loading ? <Loader /> : t("login")}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
};
export default LoginForm;
