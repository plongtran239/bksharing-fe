"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import authApi from "@/apis/auth.api";
import BaseRegisterForm from "@/app/(auth)/components/base-register-form";
import { useAppContext } from "@/app/app-provider";
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
import { EDUCATION_LEVELS } from "@/constants/enum";
import { childVariants } from "@/constants/motion";
import { useToast } from "@/hooks/use-toast";
import { cn, convertToCapitalizeCase } from "@/lib/utils";
import {
  StudentRegisterRequest,
  StudentRegisterRequestType,
} from "@/schemas/auth";

const StudentRegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const { setUser } = useAppContext();

  const form = useForm<StudentRegisterRequestType>({
    resolver: zodResolver(StudentRegisterRequest),
    defaultValues: {
      email: "",
      phoneNumber: "",
      name: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      dob: undefined,
      major: "",
      educationalLevel: undefined,
      addressBase: "",
      addressDetail: "",
    },
  });

  const onSubmit = async (values: StudentRegisterRequestType) => {
    setLoading(true);

    try {
      const result = await authApi.studentRegister(values);

      const { accessToken, avatar, name } = result.payload.data;

      await authApi.auth({
        sessionToken: accessToken,
      });

      localStorage.setItem("user", JSON.stringify({ avatar, name }));

      setUser({ avatar, name });

      toast({
        title: "Success",
        description: "Register successfully!",
      });

      router.push("/categories");
    } catch (error) {
      toast({
        title: "Error",
        description: "Email or phone number already exists",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseRegisterForm form={form} onSubmit={onSubmit} loading={loading}>
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
