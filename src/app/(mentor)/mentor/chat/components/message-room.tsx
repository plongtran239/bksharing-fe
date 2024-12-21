"use client";

import { useEffect, useState } from "react";

import chatApi from "@/apis/chat.api";
import MessageBox from "@/app/(mentor)/mentor/chat/components/message-box";
import MessageList from "@/app/(mentor)/mentor/chat/components/message-list";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { NewMessageType, RoomType } from "@/schemas/chat.schema";

const MessageRoom = () => {
  const { socketClient, chatRoomId, setChatRoomId } = useAppContext();
  const [chatRooms, setChatRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const {
          payload: { data },
        } = await chatApi.getChatList();

        setChatRooms(data);

        if (!chatRoomId && data.length > 0) {
          setChatRoomId(data[0].id);
        }
      } catch (error) {
        console.error({ error });
      }
    }

    fetchChatRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!socketClient) return;

    socketClient.on("newMessage", async (response: NewMessageType) => {
      const updateChatRoom = chatRooms.find(
        (chatRoom) => chatRoom.id === response.chatRoomId
      );

      if (updateChatRoom) {
        updateChatRoom.lastMessage.content = response.content;
        updateChatRoom.lastMessageAt = response.createdAt;

        setChatRooms((prev) => {
          const temp = [...prev];
          const index = temp.findIndex(
            (chatRoom) => chatRoom.id === response.chatRoomId
          );
          temp[index] = updateChatRoom;

          return temp;
        });
      } else {
        try {
          const {
            payload: { data },
          } = await chatApi.getChatList();

          setChatRooms(data);
        } catch (error) {
          console.error({ error });
        }
      }
    });

    return () => {
      socketClient.off("newMessage");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketClient]);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div
        className={cn({
          "col-span-1": chatRooms.length > 0,
          "col-span-3": chatRooms.length === 0,
        })}
      >
        <MessageList chatRooms={chatRooms} />
      </div>

      <MessageBox />
    </div>
  );
};
export default MessageRoom;
