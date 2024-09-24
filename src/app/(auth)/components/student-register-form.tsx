"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import authApi from "@/apis/auth.api";
import DateInput from "@/components/date-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENDERS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn, convertToCapitalizeCase } from "@/lib/utils";
import { StudentRegisterRequest, StudentRequestType } from "@/schemas/auth";

const StudentRegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<StudentRequestType>({
    resolver: zodResolver(StudentRegisterRequest),
    defaultValues: {
      email: "",
      phoneNumber: "",
      name: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      dob: undefined,
    },
  });

  const isFormValuesEmpty = Object.values(form.getValues()).some(
    (value) => value === "" || value === undefined
  );

  const onSubmit = async (values: StudentRequestType) => {
    setLoading(true);

    try {
      const result = await authApi.studentRegister(values);

      await authApi.auth({
        sessionToken: result.payload.data.accessToken,
      });

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* Email & Phone */}
        <div className="flex-between gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Name, DOB & Gender */}
        <div className="flex-between gap-5 max-lg:flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date of Birth</FormLabel>

                <FormControl>
                  <DateInput value={field.value} onChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Gender</FormLabel>
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
                      <SelectValue placeholder="select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(GENDERS).map((item) => (
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
        </div>

        {/* Password & Confirm Password */}
        <>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>

        <div className="flex-between">
          <span className="text-sm">
            Already have account?{" "}
            <Link href="/login" className="text-blue-500">
              <span className="hover:underline">Login</span>
            </Link>
          </span>

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
export default StudentRegisterForm;
