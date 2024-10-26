"use client";

import { LogOutIcon } from "lucide-react";
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

  const handleLogout = async () => {
    try {
      await authApi.logout();

      toast({
        title: "Success",
        description: "Logout successfully!",
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
        Logout
      </button>
    </DropdownMenuItem>
  );
};
export default LogoutButton;
