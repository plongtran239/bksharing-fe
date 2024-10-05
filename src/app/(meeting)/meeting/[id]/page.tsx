"use client";

import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

import MeetingRoom from "@/components/meeting-room";
import MeetingSetup from "@/components/meeting-setup";
import useGetCallById from "@/hooks/use-get-call-by-id";

const Meeting = ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(id);

  if (isCallLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};
export default Meeting;
