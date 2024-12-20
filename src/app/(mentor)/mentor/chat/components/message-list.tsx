"use client";

import { InboxIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import MessageItem from "@/app/(mentor)/mentor/chat/components/message-item";
import { Separator } from "@/components/ui/separator";
import { RoomType } from "@/schemas/chat.schema";

interface IProps {
  chatRooms: RoomType[];
  activeChatRoomId: number | null;
  setActiveChatRoomId: Dispatch<SetStateAction<number | null>>;
}

const MessageList = ({
  chatRooms,
  activeChatRoomId,
  setActiveChatRoomId,
}: IProps) => {
  if (chatRooms.length === 0) {
    return (
      <div className="h-[720px] min-w-60 overflow-y-scroll overscroll-none rounded-xl border border-primary">
        <div className="flex-center h-full flex-col gap-5">
          <InboxIcon size={40} />
          Chưa có tin nhắn nào
        </div>
      </div>
    );
  }

  return (
    <div className="h-[720px] min-w-60 overflow-y-scroll overscroll-none rounded-xl border border-primary">
      <h1 className="px-5 py-6 text-2xl font-semibold text-primary">
        Tin nhắn <span className="text-xl">({chatRooms.length})</span>
      </h1>

      <Separator className="bg-primary" />

      {chatRooms.map((item) => (
        <MessageItem
          key={item.id}
          isActive={activeChatRoomId === item.id}
          setActiveChatRoomId={setActiveChatRoomId}
          room={item}
        />
      ))}
    </div>
  );
};
export default MessageList;
