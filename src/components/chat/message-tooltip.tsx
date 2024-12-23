"use client";

import { MessagesSquareIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import chatApi from "@/apis/chat.api";
import MessageList from "@/components/chat/message-list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { NewMessageType, RoomType } from "@/schemas/chat.schema";

const MessageTooltip = () => {
  const { socketClient } = useAppContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatRooms, setChatRooms] = useState<RoomType[]>([]);
  const [numberOfUnreadMessages, setNumberOfUnreadMessages] = useState(0);

  const tooltipRef = useRef<HTMLDivElement>(null);

  // Fetch chat rooms
  const fetchChatRooms = async () => {
    setLoading(true);
    try {
      const {
        payload: { data },
      } = await chatApi.getChatList();

      setChatRooms(data);

      const unreadMessages = data.reduce((acc, room) => {
        return acc + (!room.isSeen && room.lastMessage.isReceiver ? 1 : 0);
      }, 0);

      setNumberOfUnreadMessages(unreadMessages);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  // Lắng nghe sự kiện newMessage
  useEffect(() => {
    if (!socketClient) return;

    socketClient.on("newMessage", (response: NewMessageType) => {
      const updateChatRoom = chatRooms.find(
        (chatRoom) => chatRoom.id === response.chatRoomId
      );

      if (updateChatRoom) {
        updateChatRoom.lastMessage.content = response.content;
        updateChatRoom.lastMessageAt = response.createdAt;
        setChatRooms([...chatRooms]);
      } else {
        fetchChatRooms();
      }

      return () => {
        socketClient.off("newMessage");
      };
    });
  }, [socketClient, chatRooms]);

  // Lắng nghe sự kiện click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger
          asChild
          className={cn("hover:text-primary", { "text-primary": open })}
          onClick={() => setOpen(!open)}
        >
          <div className="relative">
            <MessagesSquareIcon size={18} strokeWidth={2.5} />

            {numberOfUnreadMessages > 0 && (
              <span className="absolute -right-4 -top-4 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
                {numberOfUnreadMessages}
              </span>
            )}
          </div>
        </TooltipTrigger>

        <TooltipContent
          ref={tooltipRef}
          className="translate-y-6 border border-primary bg-white"
        >
          <MessageList chatRooms={chatRooms} loading={loading} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default MessageTooltip;
