"use client";

import { PencilIcon } from "lucide-react";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProfileHeading = ({ name }: { name: string }) => {
  return (
    <TooltipProvider>
      <div className="relative">
        {/* Background */}
        <div className="relative h-60 w-full">
          <Image
            src="/images/default-background.png"
            alt=""
            fill
            className="group-hover rounded-xl brightness-75"
            sizes="(max-width: 640px) 100px,"
            priority
          />

          <div className="absolute bottom-2 left-44 z-10 text-2xl font-semibold text-white">
            {name}
          </div>

          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="absolute right-5 top-5 rounded-full bg-white p-2">
                <PencilIcon
                  size={16}
                  className="text-primary hover:text-primary/50"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent align="center">
              <p className="text-xs">Edit background</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Avatar */}
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <button className="group">
              <Image
                src="/images/default-user.png"
                alt="Avatar"
                width={100}
                height={100}
                className="absolute bottom-1 left-10 rounded-full outline outline-2 outline-primary group-hover:opacity-30"
                priority
              />

              <div className="absolute bottom-10 left-20">
                <PencilIcon
                  size={16}
                  className="hidden text-white group-hover:block"
                />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent
            align="center"
            className="-translate-x-3 -translate-y-6"
          >
            <p className="text-xs">Edit avatar</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
export default ProfileHeading;
