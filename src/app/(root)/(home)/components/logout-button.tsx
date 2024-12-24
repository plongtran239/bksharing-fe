"use client";

import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import authApi from "@/apis/auth.api";
import fcmApi from "@/apis/fcm.api";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/app.provider";

interface LogoutButtonProps {
  handleClick?: () => void;
}

const LogoutButton = ({ handleClick }: LogoutButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("messages");

  const { setUser, setOpenMessageBox } = useAppContext();

  const handleLogout = async () => {
    const fcmToken = localStorage.getItem("fcmToken");

    if (fcmToken) {
      await fcmApi.removeToken({ token: fcmToken });
    }

    try {
      await authApi.logout();

      toast({
        title: tMessages("success"),
        description: tMessages("logoutSuccess") + "!",
      });

      localStorage.clear();

      setUser(null);

      setOpenMessageBox(false);

      router.push("/");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <DropdownMenuItem
      onClick={() => {
        handleLogout();
        handleClick && handleClick();
      }}
    >
      <button className="flex-center gap-2">
        <LogOutIcon size={16} />
        <span>{tCommon("logout")}</span>
      </button>
    </DropdownMenuItem>
  );
};
export default LogoutButton;
