"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.back()}>Quay lại</Button>;
};
export default BackButton;
