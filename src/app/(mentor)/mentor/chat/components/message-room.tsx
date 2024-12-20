"use client";

import { useEffect, useState } from "react";

import chatApi from "@/apis/chat.api";
import MessageBox from "@/app/(mentor)/mentor/chat/components/message-box";
import MessageList from "@/app/(mentor)/mentor/chat/components/message-list";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { NewMessageType, RoomType } from "@/schemas/chat.schema";

const MessageRoom = () => {
  const { socketClient } = useAppContext();
  const [chatRooms, setChatRooms] = useState<RoomType[]>([]);
  const [activeChatRoomId, setActiveChatRoomId] = useState<number | null>(null);

  useEffect(() => {
    if (!socketClient) return;

    socketClient.on("newMessage", (response: NewMessageType) => {
      const newChatRooms = chatRooms.map((chatRoom) => {
        if (chatRoom.id === response.chatRoomId) {
          return {
            ...chatRoom,
            lastMessageContent: response.content,
            lastMessageAt: response.createdAt,
            numOfUnreadMessage: chatRoom.numOfUnreadMessage + 1,
          };
        }

        return chatRoom;
      });
      setChatRooms(newChatRooms);

      return () => {
        socketClient.off("newMessage");
      };
    });
  }, [socketClient, chatRooms]);

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const {
          payload: { data },
        } = await chatApi.getChatList();

        setChatRooms(data);
        setActiveChatRoomId(data[0].id);
      } catch (error) {
        console.error({ error });
      }
    }

    fetchChatRooms();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div
        className={cn({
          "col-span-1": chatRooms.length > 0,
          "col-span-3": chatRooms.length === 0,
        })}
      >
        <MessageList
          chatRooms={chatRooms}
          activeChatRoomId={activeChatRoomId}
          setActiveChatRoomId={setActiveChatRoomId}
        />
      </div>

      <MessageBox activeChatRoomId={activeChatRoomId} />
    </div>
  );
};
export default MessageRoom;
