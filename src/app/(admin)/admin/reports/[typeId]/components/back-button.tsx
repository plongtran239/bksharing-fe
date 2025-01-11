"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.back()}>Trở về</Button>;
};
export default BackButton;
