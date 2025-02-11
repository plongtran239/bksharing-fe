"use client";

import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import meetingApi from "@/apis/meeting.api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DetailCombinationSubscriptionType } from "@/schemas/subscription.schema";

const StartButton = ({ data }: { data: DetailCombinationSubscriptionType }) => {
  const { toast } = useToast();

  const router = useRouter();

  const client = useStreamVideoClient();

  if (!client) {
    return;
  }

  const handleStartMeeting = async () => {
    const call = client.call("default", data.audiCall.cid);

    if (!call) {
      throw new Error("Failed to create a call");
    }

    try {
      await call.getOrCreate({
        data: {
          members: [
            {
              user_id: data.mentor.accountId.toString(),
              role: "admin",
            },
            ...data.combinedStudents.map((student) => ({
              user_id: student.info.id.toString(),
              role: "user",
            })),
          ],
          starts_at: new Date(Number(data.courseAccessStartAt)).toISOString(),
          custom: {
            title: data.course.name,
          },
        },
      });

      const callId = data.audiCall.cid.split("-")[1];

      await meetingApi.startMeeting(parseInt(callId));

      router.push(`/meeting/${data.audiCall.cid}`);

      toast({
        title: "Thành công",
        description: "Cuộc gọi đã bắt đầu!",
      });
    } catch (error) {
      console.error({ error });

      toast({
        title: "Error",
        description: "Failed to start meeting!",
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleStartMeeting}>Bắt đầu buổi học</Button>;
};
export default StartButton;
