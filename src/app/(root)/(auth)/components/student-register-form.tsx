"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import BaseRegisterForm from "@/app/(root)/(auth)/components/base-register-form";
import {
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
import { Separator } from "@/components/ui/separator";
import { EDUCATION_LEVELS, ROLES } from "@/constants/enum";
import { childVariants } from "@/constants/motion";
import { useRegister } from "@/hooks/use-register";
import { cn, convertToCapitalizeCase } from "@/lib/utils";
import { StudentRegisterRequest, StudentRegisterRequestType } from "@/schemas";

const StudentRegisterForm = () => {
  const { isLoading, register } = useRegister(ROLES.STUDENT);

  const form = useForm<StudentRegisterRequestType>({
    resolver: zodResolver(StudentRegisterRequest),
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
      <div className="flex-between gap-5 max-sm:flex-col">
        <motion.div className="w-full" variants={childVariants}>
          <FormField
            control={form.control}
            name="educationalLevel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Educational Level</FormLabel>
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
                      <SelectValue placeholder="select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(EDUCATION_LEVELS).map((item) => (
                      <SelectItem key={item} value={item}>
                        {convertToCapitalizeCase(item)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div className="w-full" variants={childVariants}>
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input placeholder="major" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Address Base & Address Detail */}
      <div className="flex-between gap-5 max-sm:flex-col">
        <motion.div className="w-full" variants={childVariants}>
          <FormField
            control={form.control}
            name="addressBase"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address Base</FormLabel>
                <FormControl>
                  <Input placeholder="address base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div className="w-full" variants={childVariants}>
          <FormField
            control={form.control}
            name="addressDetail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address Detail</FormLabel>
                <FormControl>
                  <Input placeholder="address detail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </div>
    </BaseRegisterForm>
  );
};
export default StudentRegisterForm;
