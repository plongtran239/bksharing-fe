import { motion } from "framer-motion";
import Link from "next/link";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import DateInput from "@/components/date-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENDERS } from "@/constants/enum";
import { childVariants, parentVariants } from "@/constants/motion";
import { cn, convertToCapitalizeCase } from "@/lib/utils";

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
        <div className="flex-between gap-5 max-sm:flex-col">
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"email" as Path<T>}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
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
                  <FormLabel required>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </div>

        {/* Name, DOB & Gender */}
        <div className="flex-between gap-5 max-sm:flex-col">
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"name" as Path<T>}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={"dob" as Path<T>}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="date-of-birth" required>
                    Date of Birth
                  </FormLabel>

                  <FormControl>
                    <DateInput
                      id="date-of-birth"
                      value={field.value}
                      onChange={field.onChange}
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
                  <FormLabel required>Gender</FormLabel>
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
                  <FormLabel required>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="password" {...field} />
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
                  <FormLabel required>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="confirm password" {...field} />
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
            Already have account?{" "}
            <Link href="/login" className="text-blue-500">
              <span className="hover:underline">Login</span>
            </Link>
          </span>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || loading}
          >
            {loading ? <Loader /> : "Register"}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
};
export default BaseRegisterForm;
