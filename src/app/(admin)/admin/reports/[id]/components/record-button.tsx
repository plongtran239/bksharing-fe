"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const RecordButton = ({
  reportId,
  callId,
  cid,
}: {
  reportId: number;
  callId: number;
  cid: string;
}) => {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        router.push(
          `/admin/reports/${reportId}/call?callId=${callId}&cid=${cid}`
        )
      }
    >
      Xem chi tiết buổi học
    </Button>
  );
};
export default RecordButton;
