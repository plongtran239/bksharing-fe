"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import MeetingApi from "@/apis/meeting.api";
import { Button } from "@/components/ui/button";

const EndCallButton = () => {
  const call = useCall();

  const router = useRouter();

  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );

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

      router.push("/");

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
