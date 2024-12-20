"use client";

import Image from "next/image";

import { useAppContext } from "@/providers/app.provider";
import { RoomType } from "@/schemas/chat.schema";

interface IProps {
  chatRoom: RoomType;
}

const MessageItem = ({ chatRoom }: IProps) => {
  const { setOpenMessageBox, setChatRoomId } = useAppContext();

  const handleClick = () => {
    setChatRoomId(chatRoom.id);
    setOpenMessageBox(true);
  };

  return (
    <div
      className="flex items-center gap-3 p-3 hover:bg-primary/30"
      onClick={handleClick}
    >
      <div className="relative h-10 w-10">
        <Image
          src={
            chatRoom.receiver.thumbnail?.originalUrl ||
            "/images/default-user.png"
          }
          alt=""
          fill
          sizes="100%"
          className="rounded-full"
        />
      </div>

      <div className="flex-1">
        <p className="text-base font-semibold text-black">
          {chatRoom.receiver.name}
        </p>
        <p className="line-clamp-1 text-sm text-foreground">
          {chatRoom.lastMessageContent || "Chưa có tin nhắn"}
        </p>
      </div>
    </div>
  );
};
export default MessageItem;
