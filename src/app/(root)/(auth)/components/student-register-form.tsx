"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import BaseRegisterForm from "@/app/(root)/(auth)/components/base-register-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { EDUCATION_LEVELS, ROLES } from "@/constants/enum";
import MAJORS from "@/constants/major";
import { childVariants } from "@/constants/motion";
import { useRegister } from "@/hooks/use-register";
import { cn } from "@/lib/utils";
import { StudentRegisterRequest, StudentRegisterRequestType } from "@/schemas";

const StudentRegisterForm = () => {
  const t = useTranslations("authPage.register.studentForm");

  const tMajor = useTranslations("major");

  const { isLoading, register } = useRegister(ROLES.STUDENT);

  const form = useForm<StudentRegisterRequestType>({
    resolver: zodResolver(StudentRegisterRequest),
    defaultValues: {
      name: "",
      email: "",
      dob: undefined,
      gender: undefined,
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      educationLevel: undefined,
      major: "",
    },
  });

  const onSubmit = async (values: StudentRegisterRequestType) => {
    register(values);
  };

  return (
    <BaseRegisterForm form={form} onSubmit={onSubmit} loading={isLoading}>
      <motion.div variants={childVariants}>
        <Separator />
      </motion.div>

      {/* Educational Level & Major */}
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <motion.div
          className={cn({
            "col-span-2":
              form.watch("educationLevel") !== EDUCATION_LEVELS.UNIVERSITY,
          })}
          variants={childVariants}
        >
          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t("educationalLevel")}</FormLabel>
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
                      <SelectValue placeholder={t("educationalLevel")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(EDUCATION_LEVELS).map((item) => (
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

        {form.watch("educationLevel") === EDUCATION_LEVELS.UNIVERSITY && (
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("major")}</FormLabel>

                  <Select>
                    <FormControl>
                      <SelectTrigger
                        className={cn("text-sm", {
                          "text-muted-foreground": !field.value,
                        })}
                      >
                        <SelectValue placeholder={t("major")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(MAJORS).map((major) => (
                        <SelectGroup key={major.label}>
                          <SelectLabel className="font-bold">
                            {tMajor(major.label)}
                          </SelectLabel>
                          {Object.entries(major.subs).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {tMajor(label)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}
      </div>
    </BaseRegisterForm>
  );
};
export default StudentRegisterForm;
