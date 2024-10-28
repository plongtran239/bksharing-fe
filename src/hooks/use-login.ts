import { useRouter } from "next/navigation";
import { useState } from "react";

import authApi from "@/apis/auth.api";
import { ROLES } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/app.provider";
import { LoginRequestType } from "@/schemas";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const login = async (values: LoginRequestType) => {
    setLoading(true);

    try {
      const result = await authApi.login(values);
      const data = result.payload.data;
      await authApi.auth({
        sessionToken: data.accessToken,
        role: data.accountType,
      });

      setUser(data);

      toast({
        title: "Success",
        description: "Login successfully!",
      });

      switch (data.accountType) {
        case ROLES.ADMIN:
          router.push("/admin/dashboard");
          break;
        case ROLES.MENTOR:
          router.push("/mentor/courses");
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
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
