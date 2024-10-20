"use client";

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { CalendarCheckIcon, CopyIcon, PlayIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DatetimeInput from "@/components/datetime-input";
import MeetingCard from "@/components/meeting-card";
import MeetingModal from "@/components/meeting-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import envConfig from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/app.provider";

type MeetingType =
  | "isScheduleMeeting"
  | "isJoiningMeeting"
  | "isInstantMeeting"
  | undefined;

const MeetingTypeList = () => {
  const router = useRouter();

  const { toast } = useToast();

  const { user } = useAppContext();

  const [meetingState, setMeetingState] = useState<MeetingType>(undefined);

  const [meetingValues, setMeetingValues] = useState({
    description: "",
    dateTime: new Date(),
    link: "",
  });

  const [callDetail, setCallDetail] = useState<Call>();

  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) {
      return;
    }

    try {
      const id = crypto.randomUUID();

      const call = client.call("default", id);

      if (!call) {
        throw new Error("Failed to create a call");
      }

      const startAt =
        meetingValues.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();

      const description = meetingValues.description || "No description";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      setCallDetail(call);

      toast({
        title: "Meeting Created",
        description: "Meeting has been created successfully!",
      });

      if (meetingState === "isInstantMeeting") {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="mt-5 grid w-full grid-cols-4 gap-5 text-white max-lg:grid-cols-2 max-sm:grid-cols-1">
      <MeetingCard
        icon="plus"
        title="New Meeting"
        description="Set up a new meeting"
        className="bg-primary/80"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />

      <MeetingCard
        icon="user-plus"
        title="Join Meeting"
        description="Via invitation link"
        className="bg-secondary-foreground/60"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />

      <MeetingCard
        icon="calendar-plus"
        title="Schedule Meeting"
        description="Plan a meeting"
        className="bg-icon-2/80"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />

      <MeetingCard
        icon="video"
        title="View Recordings"
        description="Meeting recordings"
        className="bg-icon-1/80"
        handleClick={() => router.push("/recordings")}
      />

      {/* New Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start An Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        buttonIcon={<PlayIcon size={16} strokeWidth={2.5} />}
        handleClick={createMeeting}
      />

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type The Meeting Link"
        className="text-center"
        buttonText="Join Meeting"
        buttonIcon={<SendIcon size={16} />}
        handleClick={() => router.push(meetingValues.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) =>
            setMeetingValues({ ...meetingValues, link: e.target.value })
          }
          className="mt-5"
        />
      </MeetingModal>

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Schedule Meeting"
          buttonText="Schedule Meeting"
          buttonIcon={<CalendarCheckIcon size={16} />}
          handleClick={createMeeting}
        >
          <div className="mt-5 w-full space-y-5">
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="description"
                className="mt-1"
              />
            </div>

            <div className="flex w-full flex-col">
              <Label htmlFor="date" required>
                Date & Time
              </Label>
              <DatetimeInput
                id="date"
                selected={meetingValues.dateTime}
                onChange={(date) =>
                  setMeetingValues({ ...meetingValues, dateTime: date! })
                }
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
            setCallDetail(undefined);
          }}
          title="Meeting Created"
          handleClick={() => {
            const meetingLink = `${envConfig.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail.id}`;
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Sucess", description: "Link Copied!" });
          }}
          buttonIcon={<CopyIcon size={16} />}
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}
    </div>
  );
};
export default MeetingTypeList;
