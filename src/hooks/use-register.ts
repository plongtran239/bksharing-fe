import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import authApi from "@/apis/auth.api";
import { ROLES } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/app.provider";
import {
  MentorRegisterRequestType,
  StudentRegisterRequestType,
} from "@/schemas";

export const useRegister = (role: ROLES) => {
  const t = useTranslations("messages");
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAppContext();

  const register = async (
    values: MentorRegisterRequestType | StudentRegisterRequestType,
    fileId?: number | undefined
  ) => {
    try {
      setIsLoading(true);

      let result = null;

      if (role === ROLES.MENTOR) {
        result = await authApi.mentorRegsiter({
          ...(values as MentorRegisterRequestType),
          fileId: fileId,
        });
      }

      if (role === ROLES.STUDENT) {
        result = await authApi.studentRegister({
          ...(values as StudentRegisterRequestType),
          major: (values as StudentRegisterRequestType).major || "student",
        });
      }

      if (result === null) {
        throw new Error("");
      }

      const data = result.payload.data;

      await authApi.auth({
        sessionToken: data.accessToken,
        role: data.accountType,
      });

      setUser(data);

      toast({
        title: t("success"),
        description: t("registerSuccess") + "!",
      });

      switch (data.accountType) {
        case ROLES.MENTOR:
          router.push("/users/profile");
          break;
        case ROLES.STUDENT:
          router.push("/");
          break;
        default:
          break;
      }

      router.refresh();
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
