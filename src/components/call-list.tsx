"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { CopyIcon, PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MeetingCard from "@/components/meeting-card";
import { Button } from "@/components/ui/button";
import { useGetCalls } from "@/hooks/use-get-calls";
import { useToast } from "@/hooks/use-toast";

type CallType = "ended" | "upcoming" | "recordings";

interface CallListProps {
  type: CallType;
}

const CallList = ({ type }: CallListProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!callRecordings) return;

      const callData = await Promise.all(
        callRecordings.map((meeting) => meeting.queryRecordings())
      );

      const recordings = callData
        .filter((call) => call?.recordings?.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return <div>Loading...</div>;

  const calls = getCalls();

  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 max-sm:mx-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index) => (
          <MeetingCard
            key={index}
            icon="video"
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            className="cursor-default bg-white shadow-2xl"
          >
            <div className="flex-center gap-2">
              <Button
                onClick={() => router.push(`${(meeting as CallRecording).url}`)}
                className="flex-center gap-2"
              >
                <PlayIcon size={20} />
                Play
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(
                    type === "recordings"
                      ? (meeting as CallRecording).url
                      : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                  );
                  toast({
                    title: "Link Copied",
                  });
                }}
                className="flex-center gap-2"
              >
                <CopyIcon size={20} />
                Copy Link
              </Button>
            </div>
          </MeetingCard>
        ))
      ) : (
        <h1 className="text-2xl font-bold">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
