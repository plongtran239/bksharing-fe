"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import authApi from "@/apis/auth.api";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/app.provider";

const LogoutButton = () => {
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

      localStorage.removeItem("user");

      setUser(null);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <button className="flex-center gap-2">
        <LogOutIcon size={16} />
        Logout
      </button>
    </DropdownMenuItem>
  );
};
export default LogoutButton;
