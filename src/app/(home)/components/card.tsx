import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ICardProps {
  icon: ReactNode;
  backgroundIcon: string;
  heading: string;
  content: string;
}

const colorClasses = {
  "#5B72EE": "bg-[#5B72EE]",
  "#00CBB8": "bg-[#00CBB8]",
  "#29B9E7": "bg-[#29B9E7]",
};

const Card = ({ icon, backgroundIcon, heading, content }: ICardProps) => {
  return (
    <div className="relative h-64 w-full flex-col rounded-xl p-5 text-center shadow-2xl dark:bg-white">
      {/* icon */}
      <div className="flex-center absolute -top-8 left-0 w-full">
        <div
          className={cn(
            "w-fit rounded-full p-4",
            colorClasses[backgroundIcon as keyof typeof colorClasses]
          )}
        >
          {icon}
        </div>
      </div>

      {/* heading */}
      <div className="mt-10 text-2xl text-[#2F327D]">{heading}</div>

      {/* content */}
      <div className="mt-4 text-[#696984]">{content}</div>
    </div>
  );
};
export default Card;
