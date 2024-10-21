"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { PlusIcon, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import BaseRegisterForm from "@/app/(root)/(auth)/components/base-register-form";
import DateInput from "@/components/date-input";
import FileInput from "@/components/file-input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ACHIEVEMENT_TYPES,
  FOLDER,
  RESOURCE_TYPE,
  ROLES,
} from "@/constants/enum";
import { childVariants } from "@/constants/motion";
import { useRegister } from "@/hooks/use-register";
import { useToast } from "@/hooks/use-toast";
import { useUploadFile } from "@/hooks/use-upload-file";
import { cn, convertToCapitalizeCase } from "@/lib/utils";
import { MentorRegisterRequest, MentorRegisterRequestType } from "@/schemas";

const MentorRegisterForm = () => {
  const { toast } = useToast();

  const {
    file: cvFile,
    setFile: setCvFile,
    uploadFile,
    isLoading: isUploadFileLoading,
  } = useUploadFile({
    resourceType: RESOURCE_TYPE.RAW.toLowerCase(),
    folder: FOLDER.FILES.toLowerCase(),
  });

  const { register, isLoading: isRegisterLoading } = useRegister(ROLES.MENTOR);

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
    const createdSignedUrl = await uploadFile(cvFile);

    if (!createdSignedUrl) {
      return;
    }

    const fileId = createdSignedUrl?.fileId;

    register(values, fileId);
  };

  return (
    <BaseRegisterForm
      form={form}
      onSubmit={onSubmit}
      loading={isRegisterLoading || isUploadFileLoading}
    >
      <motion.div variants={childVariants}>
        <Separator />
      </motion.div>

      {/* Resume / CV */}
      <motion.div variants={childVariants}>
        <div>
          <Label htmlFor="cv" className="flex-center mb-2" required>
            Resume / CV
          </Label>
          <FileInput
            id="cv"
            accept="application/pdf"
            value={cvFile?.name}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setCvFile(e.target.files[0]);
              } else {
                setCvFile(undefined);
              }
            }}
          />
        </div>
      </motion.div>

      <motion.div variants={childVariants}>
        <Separator />
      </motion.div>

      {/* Achievements */}
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-5">
          <motion.div className="flex-between" variants={childVariants}>
            <h2 className="text-lg font-medium text-primary">
              Achievement #{index + 1}
            </h2>

            <button
              type="button"
              onClick={() => handleRemoveAchievement(index)}
            >
              <X
                size={16}
                className="rounded-full text-primary hover:border hover:border-destructive hover:text-destructive"
              />
            </button>
          </motion.div>

          <div className="flex-between gap-5 max-sm:flex-col">
            <motion.div variants={childVariants} className="w-full">
              <FormField
                control={form.control}
                name={`achievements.${index}.achievementType`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required>Type</FormLabel>
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
                          <SelectValue placeholder="select type" />
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
            </motion.div>

            {/* Conditionally Render Additional Fields */}
            {form.watch(`achievements.${index}.achievementType`) ===
              ACHIEVEMENT_TYPES.EXPERIENCE && (
              <motion.div className="w-full" variants={childVariants}>
                <FormField
                  control={form.control}
                  name={`achievements.${index}.position`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required>Position</FormLabel>
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
              </motion.div>
            )}

            {form.watch(`achievements.${index}.achievementType`) ===
              ACHIEVEMENT_TYPES.EDUCATION && (
              <motion.div className="w-full" variants={childVariants}>
                <FormField
                  control={form.control}
                  name={`achievements.${index}.major`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required>Major</FormLabel>
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
              </motion.div>
            )}

            {form.watch(`achievements.${index}.achievementType`) ===
              ACHIEVEMENT_TYPES.CERTIFICATION && (
              <motion.div className="w-full" variants={childVariants}>
                <FormField
                  control={form.control}
                  name={`achievements.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required>Certification Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="certification name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            <motion.div className="w-full" variants={childVariants}>
              <FormField
                control={form.control}
                name={`achievements.${index}.organization`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <div className="flex-between gap-5 max-sm:flex-col">
            <motion.div className="w-full" variants={childVariants}>
              <FormField
                control={form.control}
                name={`achievements.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required htmlFor="start-date">
                      Start Date
                    </FormLabel>
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
            </motion.div>

            <motion.div className="w-full" variants={childVariants}>
              <FormField
                control={form.control}
                name={`achievements.${index}.endDate`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required htmlFor="end-date">
                      End Date
                    </FormLabel>
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
            </motion.div>
          </div>
          <motion.div className="w-full" variants={childVariants}>
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
          </motion.div>

          <motion.div className="w-full" variants={childVariants}>
            <Separator />
          </motion.div>
        </div>
      ))}

      <motion.div className="flex-center" variants={childVariants}>
        <Button
          variant="outline"
          type="button"
          className="flex-center gap-2"
          onClick={handleAddAchievement}
        >
          <PlusIcon size={16} />
          Add Achievement
        </Button>
      </motion.div>
    </BaseRegisterForm>
  );
};

export default MentorRegisterForm;
