"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import authApi from "@/apis/auth.api";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
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

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenuItem>
      <button onClick={handleLogout} className="flex-center gap-2">
        <LogOutIcon size={16} />
        Logout
      </button>
    </DropdownMenuItem>
  );
};
export default LogoutButton;
