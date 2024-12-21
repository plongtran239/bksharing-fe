"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { RoomType } from "@/schemas/chat.schema";

interface IProps {
  room: RoomType;
}

const MessageItem = ({ room }: IProps) => {
  const { chatRoomId, setChatRoomId } = useAppContext();

  const { socketClient } = useAppContext();

  const isActive = chatRoomId === room.id;

  const isUnread = !room.isSeen && room.lastMessage.isReceiver;

  const handleClick = () => {
    if (!socketClient) return;

    socketClient.emit("read-message", {
      chatRoomId: room.id,
    });

    setChatRoomId(room.id);
  };

  return (
    <div
      className={cn("flex items-center gap-3 p-4", {
        "bg-primary/90 text-white": isActive,
        "hover:bg-primary/30": !isActive,
        "font-semibold": isUnread,
      })}
      onClick={handleClick}
    >
      <div className="flex-between w-full gap-3">
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
          <p
            className={cn("text-sm", {
              "text-black": isUnread && !isActive,
            })}
          >
            {room.lastMessage.content
              ? room.lastMessage.isReceiver
                ? room.lastMessage.content
                : "Bạn: " + room.lastMessage.content
              : "Chưa có tin nhắn"}
          </p>
        </div>
      </div>

      {isUnread && !isActive && (
        <div className="h-2 w-2 rounded-full bg-primary" />
      )}
    </div>
  );
};
export default MessageItem;
