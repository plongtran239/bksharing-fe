"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { RoomType } from "@/schemas/chat.schema";

interface IProps {
  chatRoom: RoomType;
}

const MessageItem = ({ chatRoom }: IProps) => {
  const { setOpenMessageBox, setChatRoomId, socketClient } = useAppContext();

  const handleClick = () => {
    if (!socketClient) return;

    socketClient.emit("read-message", {
      chatRoomId: chatRoom.id,
    });

    setChatRoomId(chatRoom.id);
    setOpenMessageBox(true);
  };

  const isNewMessage = chatRoom.lastMessage.isReceiver && !chatRoom.isSeen;

  return (
    <div
      className="flex-between w-full p-3 hover:bg-primary/30"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
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
          <p
            className={cn("text-base text-black", {
              "font-semibold": isNewMessage,
            })}
          >
            {chatRoom.receiver.name}
          </p>
          <p
            className={cn("line-clamp-1 text-sm text-foreground", {
              "font-semibold text-black": isNewMessage,
            })}
          >
            {chatRoom.lastMessage.content
              ? chatRoom.lastMessage.isReceiver
                ? chatRoom.lastMessage.content
                : "Bạn: " + chatRoom.lastMessage.content
              : "Chưa có tin nhắn"}
          </p>
        </div>
      </div>

      {isNewMessage && <div className="h-2 w-2 rounded-full bg-primary" />}
    </div>
  );
};
export default MessageItem;
