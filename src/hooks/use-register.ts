import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import authApi from "@/apis/auth.api";
import { ROLES } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import {
  MentorRegisterRequestType,
  StudentRegisterRequestType,
} from "@/schemas";

export const useRegister = (role: ROLES) => {
  const t = useTranslations("messages");
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (
    values: MentorRegisterRequestType | StudentRegisterRequestType,
    fileId?: number | undefined
  ) => {
    try {
      setIsLoading(true);

      if (role === ROLES.MENTOR) {
        await authApi.mentorRegsiter({
          ...(values as MentorRegisterRequestType),
          fileId: fileId,
        });
      }

      if (role === ROLES.STUDENT) {
        await authApi.studentRegister({
          ...(values as StudentRegisterRequestType),
          major: (values as StudentRegisterRequestType).major || "student",
        });
      }

      router.push("/email-verification");

      toast({
        title: t("success"),
        description: t("registerSuccess") + "!",
      });
    } catch (error) {
      console.error({ error });

      toast({
        title: t("error"),
        description: t("registerError"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, register };
};
