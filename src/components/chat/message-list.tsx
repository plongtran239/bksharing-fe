import { InboxIcon } from "lucide-react";

import MessageItem from "@/components/chat/message-item";
import Loader from "@/components/loader";
import { Separator } from "@/components/ui/separator";
import { RoomType } from "@/schemas/chat.schema";

interface IProps {
  chatRooms: RoomType[];
  loading?: boolean;
}

const MessageList = ({ chatRooms, loading }: IProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 p-5 text-base text-foreground">
        <Loader />
      </div>
    );
  }

  if (chatRooms.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 p-5 text-base text-foreground">
        <InboxIcon size={24} />
        <p className="text-sm">Không có tin nhắn nào</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="p-4 text-base text-primary">
        Tin nhắn ({chatRooms.length})
      </h1>

      <Separator />

      <div className="max-h-[437px] w-80 overflow-y-scroll overscroll-none">
        {chatRooms.map((chatRoom) => (
          <MessageItem key={chatRoom.id} chatRoom={chatRoom} />
        ))}
      </div>
    </div>
  );
};
export default MessageList;
