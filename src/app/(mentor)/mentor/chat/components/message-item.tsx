import Image from "next/image";

import { cn } from "@/lib/utils";

interface IProps {
  isActive?: boolean;
}

const MessageItem = ({ isActive }: IProps) => {
  return (
    <div
      className={cn("flex items-center gap-3 p-4", {
        "bg-primary/90 text-white": isActive,
        "hover:bg-primary/30": !isActive,
      })}
    >
      <div className="relative h-12 w-12">
        <Image
          src="/images/default-user.png"
          alt=""
          fill
          className={cn("rounded-full", {
            "bg-white": isActive,
          })}
        />
      </div>
      <div className="">
        <h1
          className={cn("font-semibold text-black", {
            "text-white": isActive,
          })}
        >
          Nguyễn Văn A
        </h1>
        <p className="line-clamp-1 text-sm">Xin chào em</p>
      </div>
    </div>
  );
};
export default MessageItem;
