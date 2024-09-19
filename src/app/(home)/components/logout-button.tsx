"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import authApi from "@/apis/auth.api";
import { useToast } from "@/hooks/use-toast";

const LogoutButton = () => {
  const router = useRouter();

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await authApi.logout();

      toast({
        title: "Success",
        description: "Logout successfully!",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout} className="flex-center gap-2">
      <LogOutIcon size={16} />
      Logout
    </button>
  );
};
export default LogoutButton;
