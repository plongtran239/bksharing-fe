import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import authApi from "@/apis/auth.api";
import fcmApi from "@/apis/fcm.api";
import { ROLES } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { generateFcmToken } from "@/lib/firebase";
import { useAppContext } from "@/providers/app.provider";
import { LoginRequestType } from "@/schemas";

export const useLogin = () => {
  const t = useTranslations("messages");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const login = async (values: LoginRequestType) => {
    setLoading(true);

    try {
      const result = await authApi.login(values);

      const data = result.payload.data;

      const fcmToken = await generateFcmToken();

      if (!fcmToken) {
        throw new Error("generate FCM Token failed");
      }

      await fcmApi.registerToken({ token: fcmToken });

      await authApi.auth({
        sessionToken: data.accessToken,
        role: data.accountType,
      });

      setUser(data);

      localStorage.setItem("fcmToken", fcmToken);

      toast({
        title: t("success"),
        description: t("loginSuccess") + "!",
      });

      switch (data.accountType) {
        case ROLES.ADMIN:
          router.replace("/admin/dashboard");
          break;
        case ROLES.MENTOR:
          router.replace("/mentor/courses");
          break;
        case ROLES.STUDENT:
          router.replace("/");
          break;
        default:
          break;
      }

      router.refresh();
    } catch (error) {
      console.error({ error });

      toast({
        title: t("error"),
        description: t("loginError"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
