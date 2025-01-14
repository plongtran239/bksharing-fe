import Image from "next/image";

import {
  Timeline,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/timeline";
import { cn } from "@/lib/utils";

export type TimelineItemType = {
  id: number;
  title: string;
  avatar: string;
  role: string;
  type: number;
  description: string;
  time: string;
};

export const TimelineLayout = ({ data }: { data: TimelineItemType[] }) => {
  return (
    <Timeline className="mt-8">
      {data.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineHeader>
            <TimelineTime
              className={cn({
                "bg-green-400": item.type === 0,
                "bg-red-400": item.type === 1,
              })}
            >
              {item.time}
            </TimelineTime>
            <TimelineTitle
              className={cn({
                "text-primary": item.role === "ADMIN",
                "text-secondary-foreground": item.role === "USER",
              })}
            >
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image
                    src={item.avatar}
                    fill
                    alt=""
                    className="rounded-full"
                  />
                </div>
                {item.title}
              </div>
            </TimelineTitle>
          </TimelineHeader>
          <TimelineDescription>{item.description}</TimelineDescription>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
