"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import meetingApi from "@/apis/meeting.api";
import { Button } from "@/components/ui/button";
import { ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";

const EndCallButton = () => {
  const call = useCall();

  const router = useRouter();

  const { user } = useAppContext();

  if (!call) throw new Error("Call not found");

  const { useLocalParticipant } = useCallStateHooks();

  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const handleEndCall = async () => {
    const meetingId = Number(call.id.split("-")[1]);

    try {
      await meetingApi.endMeeting(meetingId);

      await call.stopRecording();
      console.log("Recording stopped");

      await call.endCall();

      switch (user?.accountType) {
        case ROLES.ADMIN:
          router.push("/admin/dashboard");
          break;
        case ROLES.MENTOR:
          router.push("/mentor/dashboard");
          break;
        case ROLES.STUDENT:
          router.push("/subscriptions");
          break;
        default:
          break;
      }

      router.refresh();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Button onClick={handleEndCall} variant="destructive">
      Kết thúc cuộc gọi
    </Button>
  );
};

export default EndCallButton;
