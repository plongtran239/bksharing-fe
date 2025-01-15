"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const CallButton = ({
  subscriptionId,
  callId,
  cid,
}: {
  subscriptionId: number;
  callId: number;
  cid: string;
}) => {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        router.push(
          `/admin/subscriptions/${subscriptionId}/call?callId=${callId}&cid=${cid}`
        )
      }
    >
      Xem chi tiết buổi học
    </Button>
  );
};
export default CallButton;
