import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";
import { RoomType } from "@/schemas/chat.schema";

interface IProps {
  room: RoomType;
  isActive?: boolean;
  setActiveChatRoomId: Dispatch<SetStateAction<number | null>>;
}

const MessageItem = ({ room, isActive, setActiveChatRoomId }: IProps) => {
  return (
    <div
      className={cn("flex items-center gap-3 p-4", {
        "bg-primary/90 text-white": isActive,
        "hover:bg-primary/30": !isActive,
      })}
      onClick={() => setActiveChatRoomId(room.id)}
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
      <div className="flex-1">
        <h1
          className={cn("font-semibold text-black", {
            "text-white": isActive,
          })}
        >
          {room.receiver.name}
        </h1>
        <p className="line-clamp-1 text-sm">
          {room.lastMessageContent || "Chưa có tin nhắn"}
        </p>
      </div>
    </div>
  );
};
export default MessageItem;
