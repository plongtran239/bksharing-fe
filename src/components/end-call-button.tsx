"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import MeetingApi from "@/apis/meeting.api";
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
      await MeetingApi.endMeeting(meetingId);

      await call.endCall();

      if (user?.accountType === ROLES.ADMIN) {
        router.push("/admin/meetings");
      } else {
        router.push("/meeting");
      }

      router.refresh();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Button onClick={handleEndCall} variant="destructive">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
