import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ICardProps {
  icon: ReactNode;
  backgroundIcon: string;
  heading: string;
  content: string;
}

const Card = ({ icon, backgroundIcon, heading, content }: ICardProps) => {
  return (
    <div className="relative h-64 w-full flex-col rounded-xl p-5 text-center shadow-2xl dark:bg-white">
      {/* icon */}
      <div className="flex-center absolute -top-8 left-0 w-full">
        <div className={cn("w-fit rounded-full p-4", backgroundIcon)}>
          {icon}
        </div>
      </div>

      {/* heading */}
      <div className="mt-10 text-2xl text-secondary-foreground">{heading}</div>

      {/* content */}
      <div className="mt-4">{content}</div>
    </div>
  );
};
export default Card;
