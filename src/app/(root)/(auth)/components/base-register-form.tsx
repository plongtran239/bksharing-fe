import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import Loader from "@/components/loader";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker";
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
import { childVariants, parentVariants } from "@/constants/motion";
import { cn } from "@/lib/utils";

interface IBaseRegisterFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void>;
  loading: boolean;
  children?: React.ReactNode;
}

const BaseRegisterForm = <T extends FieldValues>({
  form,
  onSubmit,
  loading,
  children,
}: IBaseRegisterFormProps<T>) => {
  const router = useRouter();

  const t = useTranslations("authPage.register");

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
        initial="hidden"
        animate="show"
        variants={parentVariants}
      >
        {/* Email & Phone */}
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"email" as Path<T>}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"phoneNumber" as Path<T>}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("phone")}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder={t("phone")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </div>

        {/* Name */}
        <motion.div className="w-full" variants={childVariants}>
          <FormField
            control={form.control}
            name={"name" as Path<T>}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t("fullname")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("fullname")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"dob" as Path<T>}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="date-of-birth" required>
                    {t("dateOfBirth")}
                  </FormLabel>

                  <FormControl>
                    <DateTimePicker
                      id="date-of-birth"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("dateOfBirth")}
                      displayFormat={{ hour24: "dd/MM/yyyy" }}
                      granularity="day"
                      limitToCurrent={true}
                      locale={vi}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"gender" as Path<T>}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("gender")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn("text-sm", {
                          "text-muted-foreground": !field.value,
                        })}
                      >
                        <SelectValue placeholder={t("gender")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(GENDERS).map((item) => (
                        <SelectItem key={item} value={item}>
                          {t(item.toLowerCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </div>

        {/* Password & Confirm Password */}
        <>
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"password" as Path<T>}
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

          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"confirmPassword" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t("confirmPassword")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("confirmPassword")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </>

        {children}

        <motion.div
          className="flex-between max-sm:flex-col max-sm:gap-5"
          variants={childVariants}
        >
          <span className="text-sm">
            {t("alreadyHaveAccount")}{" "}
            <Button
              type="button"
              className="px-1 py-0"
              variant="link"
              onClick={() => router.push("/login")}
            >
              {t("login")}
            </Button>
          </span>

          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting || !form.formState.isDirty || loading
            }
          >
            {loading ? <Loader /> : t("register")}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
};
export default BaseRegisterForm;
