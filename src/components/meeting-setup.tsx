import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface MeetingSetupProps {
  setIsSetupComplete: (isSetupComplete: boolean) => void;
}

const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
  const [isMicCamEnabled, setIsMicCamEnabled] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("Call not found");
  }

  useEffect(() => {
    if (isMicCamEnabled) {
      call.camera.enable();
      call.microphone.enable();
    } else {
      call.camera.disable();
      call.microphone.disable();
    }
  }, [isMicCamEnabled, call.camera, call.microphone]);

  return (
    <div className="flex-center container min-h-[calc(100vh-75px-260px)] w-full py-10">
      <div className="flex-center gap-20 max-lg:flex-col max-lg:gap-5">
        <div className="flex-center rounded-xl bg-black">
          <VideoPreview />
        </div>

        <div className="flex-center flex-col gap-5 max-lg:mt-10">
          <h1 className="text-center text-2xl font-semibold">Ready to join?</h1>

          <div className="flex items-center justify-center gap-3">
            <label className="flex items-center justify-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={isMicCamEnabled}
                onChange={(e) => setIsMicCamEnabled(e.target.checked)}
              />
              Join with mic and camera
            </label>
          </div>

          <DeviceSettings />

          <Button
            className="rounded-md bg-primary px-4 py-2.5"
            onClick={() => {
              call.join();
              setIsSetupComplete(true);
            }}
          >
            Join meeting
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MeetingSetup;
