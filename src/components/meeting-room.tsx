"use client";

import {
  CallControls,
  CallParticipantsList,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// import MeetingApi from "@/apis/meeting.api";
import EndCallButton from "@/components/end-call-button";
import { Button } from "@/components/ui/button";
import { ROLES } from "@/constants/enum";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const router = useRouter();

  const call = useCall();

  const { user } = useAppContext();

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");

  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  if (!call || !user) {
    return;
  }

  const handleLeave = async () => {
    // const meetingId = Number(call.id.split("-")[1]);

    // try {
    // await MeetingApi.leaveMeeting(meetingId);

    if (user.accountType === ROLES.ADMIN) {
      router.push("/admin/meetings");
    } else {
      router.push("/meeting");
    }

    router.refresh();
    // } catch (error) {
    //   console.error({ error });
    // }
  };

  if (callingState === CallingState.JOINING) {
    return <div>Loading...</div>;
  }

  if (callingState === CallingState.LEFT) {
    return (
      <div className="flex-center h-screen gap-5">
        <p>Call has ended</p>
        <Link href={"/"}>
          <Button>Back</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="relative h-screen w-full overflow-hidden text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("ml-2 hidden h-[calc(100vh-86px)]", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* video layout and call controls */}
      <div className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5 max-sm:bottom-10">
        <CallControls onLeave={handleLeave} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-full bg-primary p-2 hover:bg-primary/80">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                {index !== 2 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <CallStatsButton /> */}

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-full bg-primary p-2 hover:bg-primary/80">
            <Users size={20} className="text-white" />
          </div>
        </button>

        <EndCallButton />
      </div>
    </main>
  );
};
export default MeetingRoom;
