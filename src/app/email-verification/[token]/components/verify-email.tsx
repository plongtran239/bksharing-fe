"use client";

import { ShieldCheckIcon, ShieldEllipsisIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import authApi from "@/apis/auth.api";
import fcmApi from "@/apis/fcm.api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateFcmToken } from "@/lib/firebase";
import { useAppContext } from "@/providers/app.provider";

enum VerifyStatus {
  VERIFYING = "VERIFYING",
  VERIFIED = "VERIFIED",
  INVALID = "INVALID",
}

const VerifyEmail = () => {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();

  const { setUser } = useAppContext();

  const token = pathname.split("/")[2];

  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(
    VerifyStatus.VERIFYING
  );

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    async function verifyEmail() {
      try {
        const {
          payload: { data },
        } = await authApi.verifyEmail(token);

        setVerifyStatus(VerifyStatus.VERIFIED);

        setUser({
          id: data.id,
          name: data.name,
          avatar: data.avatar,
          accountType: data.accountType,
          accessToken: data.token,
        });

        const fcmToken = await generateFcmToken();

        if (fcmToken) {
          await fcmApi.registerToken({ token: fcmToken });

          localStorage.setItem("fcmToken", fcmToken);
        }

        await authApi.auth({
          role: data.accountType,
          sessionToken: data.token,
        });

        toast({
          title: "Thành công",
          description: "Tài khoản của bạn đã được xác thực!",
        });
      } catch (error) {
        console.error({ error });

        setVerifyStatus(VerifyStatus.INVALID);
      }
    }

    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  return (
    <div className="flex-center h-screen flex-col gap-5">
      {
        {
          [VerifyStatus.VERIFYING]: <ShieldEllipsisIcon size={64} />,
          [VerifyStatus.VERIFIED]: (
            <ShieldCheckIcon size={64} className="text-green-500" />
          ),
          [VerifyStatus.INVALID]: (
            <ShieldCheckIcon size={64} className="text-green-500" />
          ),
        }[verifyStatus]
      }
      <h1 className="text-2xl font-semibold text-black">
        {
          {
            [VerifyStatus.VERIFYING]: "Đang xác thực...",
            [VerifyStatus.VERIFIED]: "Xác thực thành công!",
            [VerifyStatus.INVALID]: "Xác thực thành công!",
          }[verifyStatus]
        }
      </h1>
      <p className="font-medium text-black">
        {
          {
            [VerifyStatus.VERIFYING]: "Vui lòng đợi trong giây lát...",
            [VerifyStatus.VERIFIED]: (
              <Button onClick={() => router.replace("/")}>
                Trở về sau ({countdown}) giây
              </Button>
            ),
            [VerifyStatus.INVALID]: (
              <Button onClick={() => router.replace("/")}>
                Trở về sau ({countdown}) giây
              </Button>
            ),
          }[verifyStatus]
        }
      </p>
    </div>
  );
};
export default VerifyEmail;
