"use client";

import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import authApi from "@/apis/auth.api";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/app.provider";

interface LogoutButtonProps {
  handleClick?: () => void;
}

const LogoutButton = ({ handleClick }: LogoutButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("messages");

  const handleLogout = async () => {
    try {
      await authApi.logout();

      toast({
        title: tMessages("success"),
        description: tMessages("logoutSuccess") + "!",
      });

      setUser(null);

      localStorage.removeItem("user");
      localStorage.removeItem("sessionToken");

      router.push("/");
      router.refresh();
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
