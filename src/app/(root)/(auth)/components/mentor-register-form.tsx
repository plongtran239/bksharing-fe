"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import AchievementForm from "@/app/(root)/(auth)/components/achievement-form";
import BaseRegisterForm from "@/app/(root)/(auth)/components/base-register-form";
import FileInput from "@/components/file-input";
import { MultiSelect } from "@/components/multi-select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ACHIEVEMENT_TYPES,
  FOLDER,
  RESOURCE_TYPE,
  ROLES,
  TARGET_LEVEL,
} from "@/constants/enum";
import { childVariants } from "@/constants/motion";
import { useRegister } from "@/hooks/use-register";
import { useUploadFile } from "@/hooks/use-upload-file";
import { MentorRegisterRequest, MentorRegisterRequestType } from "@/schemas";

const MentorRegisterForm = () => {
  const t = useTranslations("authPage.register.mentorForm");

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
      targetLevels: [],
      achievements: [
        {
          achievementType: ACHIEVEMENT_TYPES.EDUCATION,
          description: "",
          organization: "",
          startDate: undefined,
          endDate: undefined,
          name: undefined,
          major: undefined,
          position: undefined,
          isCurrent: true,
        },
      ],
    },
  });

  const onSubmit = async (values: MentorRegisterRequestType) => {
    console.log("values", values);

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
        <FormField
          control={form.control}
          name="targetLevels"
          render={({}) => (
            <FormItem className="w-full">
              <FormLabel required>{t("targetLevels")}</FormLabel>

              <MultiSelect
                id="targetLevels"
                placeholder="Chọn trình độ hướng tới"
                options={Object.values(TARGET_LEVEL).map((target) => ({
                  label: t(target),
                  value: target,
                }))}
                maxCount={5}
                onValueChange={(value) => {
                  form.setValue(
                    "targetLevels",
                    value as [TARGET_LEVEL, ...TARGET_LEVEL[]]
                  );
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={childVariants}>
        <Separator />
      </motion.div>

      {/* Resume / CV */}
      <motion.div variants={childVariants}>
        <div>
          <Label htmlFor="cv" className="flex-center mb-2" required>
            {t("cv")}
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
      <AchievementForm form={form} />
    </BaseRegisterForm>
  );
};

export default MentorRegisterForm;
