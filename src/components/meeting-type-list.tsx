"use client";

import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { CalendarCheckIcon, PlayIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DatetimeInput from "@/components/datetime-input";
import MeetingCard from "@/components/meeting-card";
import MeetingModal from "@/components/meeting-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  // const [callDetail, setCallDetail] = useState<Call>();

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

      // setCallDetail(call);

      toast({
        title: "Meeting Created",
        description: "Meeting has been created successfully!",
      });

      router.push(`/meeting/${call.id}`);
    } catch (error) {
      console.error(error);
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

      {/* Schedule Meeting Modal */}
      {/* {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-sky-2 text-base font-normal leading-[22.4px]">
              Add a description
            </label>
            <Textarea
              className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-sky-2 text-base font-normal leading-[22.4px]">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="bg-dark-3 w-full rounded p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )} */}

      <MeetingModal
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Schedule Meeting"
        buttonText="Schedule Meeting"
        buttonIcon={<CalendarCheckIcon size={16} />}
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
    </div>
  );
};
export default MeetingTypeList;
