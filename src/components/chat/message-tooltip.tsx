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
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [chatRooms, setChatRooms] = useState<RoomType[]>([]);

  // Fetch chat rooms
  const fetchChatRooms = async () => {
    try {
      const {
        payload: { data },
      } = await chatApi.getChatList();

      setChatRooms(data);
    } catch (error) {
      console.error({ error });
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
        updateChatRoom.lastMessageContent = response.content;
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
          <MessagesSquareIcon size={18} strokeWidth={2.5} />
        </TooltipTrigger>

        <TooltipContent
          ref={tooltipRef}
          className="translate-y-6 border border-primary bg-white"
        >
          <MessageList chatRooms={chatRooms} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default MessageTooltip;
