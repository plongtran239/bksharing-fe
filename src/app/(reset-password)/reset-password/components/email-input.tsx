"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import authApi from "@/apis/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailInput = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleNext = async () => {
    try {
      await authApi.forgotPassword({ email });

      router.push("/reset-password-verification");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="w-[600px] space-y-10 rounded-xl p-10 shadow-2xl">
      <div className="flex-between">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeftIcon size={24} className="text-primary" />
        </div>
        <h1 className="text-2xl text-primary">Đặt lại mật khẩu</h1>
        <div></div>
      </div>

      <div className="space-y-5">
        <Input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Button className="w-full" onClick={handleNext}>
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};
export default EmailInput;
