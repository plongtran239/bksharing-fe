"use client";

import {
  CalendarPlusIcon,
  PlusIcon,
  UserPlusIcon,
  VideoIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MeetingCardProps {
  className?: string;
  icon: string;
  title: string;
  date?: string;
  description?: string;
  children?: ReactNode;
  handleClick?: () => void;
}

const MeetingCard = ({
  className,
  icon,
  title,
  date,
  description,
  handleClick,
  children,
}: MeetingCardProps) => {
  return (
    <section
      className={cn(
        "flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-[14px] bg-secondary-foreground p-5",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center size-12 rounded-[10px] bg-gray-500/40">
        {icon === "plus" && <PlusIcon size={27} />}
        {icon === "user-plus" && <UserPlusIcon size={27} />}
        {icon === "calendar-plus" && <CalendarPlusIcon size={27} />}
        {icon === "video" && <VideoIcon size={27} />}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {date && <p className="text-sm">{new Date(date).toLocaleString()}</p>}
        {description && <p className="text-sm">{description}</p>}
      </div>

      {children}
    </section>
  );
};

export default MeetingCard;
