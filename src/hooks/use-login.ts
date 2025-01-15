import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import authApi from "@/apis/auth.api";
import fcmApi from "@/apis/fcm.api";
import userApi from "@/apis/user.api";
import { MENTOR_STATUS, ROLES } from "@/constants/enum";
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

      if (fcmToken) {
        await fcmApi.registerToken({ token: fcmToken });

        localStorage.setItem("fcmToken", fcmToken);
      }

      await authApi.auth({
        sessionToken: data.accessToken,
        role: data.accountType,
      });

      let mentorStatus = MENTOR_STATUS.PENDING;

      if (data.accountType === ROLES.MENTOR) {
        const {
          payload: { data: profile },
        } = await userApi.getMentorProfile(data.accessToken);

        mentorStatus = profile.status;
      }

      setUser(data);

      toast({
        title: t("success"),
        description: t("loginSuccess") + "!",
      });

      switch (data.accountType) {
        case ROLES.ADMIN:
          router.replace("/admin/dashboard");
          break;
        case ROLES.MENTOR:
          if (mentorStatus === MENTOR_STATUS.PENDING) {
            router.replace("/users/profile");
          } else {
            router.replace("/mentor/dashboard");
          }
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
