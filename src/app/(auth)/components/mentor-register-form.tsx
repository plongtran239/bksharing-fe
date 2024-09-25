"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ACHIEVEMENT_TYPES, GENDERS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn, convertToCapitalizeCase } from "@/lib/utils";
import {
  MentorRegisterRequest,
  MentorRegisterRequestType,
} from "@/schemas/auth";

const MentorRegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<MentorRegisterRequestType>({
    resolver: zodResolver(MentorRegisterRequest),
    defaultValues: {
      email: "",
      phoneNumber: "",
      name: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      dob: undefined,
      achievements: [
        {
          achievementType: undefined,
          description: "",
          organization: "",
          startDate: undefined,
          endDate: undefined,
          name: undefined,
          major: undefined,
          position: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  const isFormValuesEmpty = Object.values(form.getValues()).some(
    (value) => value === "" || value === undefined
  );

  const handleAddAchievement = () => {
    append({
      achievementType: ACHIEVEMENT_TYPES.EXPERIENCE,
      description: "",
      organization: "",
      startDate: new Date(),
      endDate: new Date(),
      name: undefined,
      major: undefined,
      position: undefined,
    });
  };

  const handleRemoveAchievement = (index: number) => {
    if (fields.length === 1) {
      return toast({
        title: "Error",
        description: "At least one achievement is required",
        variant: "destructive",
      });
    }

    remove(index);
  };

  const onSubmit = async (values: MentorRegisterRequestType) => {
    setLoading(true);

    try {
      const result = await authApi.mentorRegsiter(values);

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
                <FormLabel htmlFor="date-of-birth">Date of Birth</FormLabel>

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

        <Separator />

        {/* Achievements */}
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-5">
            <div className="flex-between">
              <h2 className="text-lg font-medium text-primary">
                Achievement #{index + 1}
              </h2>

              <button
                type="button"
                onClick={() => handleRemoveAchievement(index)}
              >
                <X
                  size={20}
                  className="rounded-full text-primary hover:border hover:border-destructive hover:text-destructive"
                />
              </button>
            </div>

            <div className="flex-between gap-5">
              <FormField
                control={form.control}
                name={`achievements.${index}.achievementType`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Achievement Type</FormLabel>
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
                          <SelectValue placeholder="Select achievement type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ACHIEVEMENT_TYPES).map((item) => (
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

              {/* Conditionally Render Additional Fields */}
              {form.watch(`achievements.${index}.achievementType`) ===
                ACHIEVEMENT_TYPES.EXPERIENCE && (
                <FormField
                  control={form.control}
                  name={`achievements.${index}.position`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Position"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch(`achievements.${index}.achievementType`) ===
                ACHIEVEMENT_TYPES.EDUCATION && (
                <FormField
                  control={form.control}
                  name={`achievements.${index}.major`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Major</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Major"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch(`achievements.${index}.achievementType`) ===
                ACHIEVEMENT_TYPES.CERTIFICATION && (
                <FormField
                  control={form.control}
                  name={`achievements.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Certification Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name={`achievements.${index}.organization`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`achievements.${index}.description`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-between gap-5">
              <FormField
                control={form.control}
                name={`achievements.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="start-date">Start Date</FormLabel>
                    <FormControl>
                      <DateInput
                        id="start-date"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`achievements.${index}.endDate`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="end-date">End Date</FormLabel>
                    <FormControl>
                      <DateInput
                        id="end-date"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />
          </div>
        ))}

        <div className="flex-center">
          <Button type="button" className="" onClick={handleAddAchievement}>
            Add Achievement
          </Button>
        </div>

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

export default MentorRegisterForm;
