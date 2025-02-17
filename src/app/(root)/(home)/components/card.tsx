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
    <div
      className={cn(
        "relative min-h-[320px] flex-col rounded-xl border p-10 text-center shadow-2xl dark:bg-white max-lg:h-[272px] max-lg:w-2/3 max-sm:min-h-80 max-sm:w-full",
        {
          "border-icon-1": backgroundIcon === "bg-icon-1",
          "border-icon-2": backgroundIcon === "bg-icon-2",
          "border-icon-3": backgroundIcon === "bg-icon-3",
        }
      )}
    >
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
