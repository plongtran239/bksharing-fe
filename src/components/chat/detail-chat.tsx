"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import chatApi from "@/apis/chat.api";
import CloseButton from "@/components/chat/close-button";
import InputBox from "@/components/chat/input-box";
import MessageBoxContainer from "@/components/chat/message-box-container";
import Loader from "@/components/loader";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/providers/app.provider";
import { DetailRoomType, NewMessageType } from "@/schemas/chat.schema";

interface IProps {}

export type MessageType = {
  id: number;
  content: string;
  senderId: number;
};

const DetailChat = ({}: IProps) => {
  const { chatRoomId, socketClient } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [detailRoom, setDetailRoom] = useState<DetailRoomType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  // Listen to new message
  useEffect(() => {
    if (!socketClient) {
      return;
    }

    socketClient.on("newMessage", (response: NewMessageType) => {
      setMessages((prev) => [
        ...prev,
        {
          id: response.id,
          content: response.content,
          senderId: response.senderId,
        },
      ]);
    });

    return () => {
      socketClient.off("newMessage");
    };
  }, [socketClient]);

  // Fetch detail room
  useEffect(() => {
    async function fetchDetailRoom() {
      if (chatRoomId) {
        try {
          setLoading(true);
          const {
            payload: { data },
          } = await chatApi.getChatDetail(chatRoomId);

          setDetailRoom(data);

          const messages = data.messages.map((message) => ({
            id: message.id,
            content: message.content,
            senderId: message.senderId,
          }));

          setMessages(messages);
        } catch (error) {
          console.error({ error });
        } finally {
          setLoading(false);
        }
      }
    }

    fetchDetailRoom();
  }, [chatRoomId]);

  const handleSendMessage = (message: string) => {
    if (!socketClient || !detailRoom) {
      return;
    }

    socketClient.emit("send-message", {
      message,
      type: "TEXT",
      receiverId: detailRoom.receiver.id,
    });
  };

  if (loading) {
    return (
      <div className="flex-center h-96 w-96">
        <Loader />
      </div>
    );
  }

  if (!detailRoom) {
    return null;
  }

  return (
    <div className="w-96">
      <div className="flex-between px-5 pt-5">
        <div className="flex-center gap-2">
          <div className="relative h-6 w-6">
            <Image
              src={
                detailRoom.receiver.thumbnail?.originalUrl ||
                "/images/default-user.png"
              }
              alt=""
              fill
              sizes="100%"
              className="rounded-full"
            />
          </div>
          <h1>{detailRoom.receiver.name}</h1>
        </div>

        <CloseButton />
      </div>

      <Separator className="my-5" />

      <div className="px-5">
        <MessageBoxContainer messages={messages} />
      </div>

      <Separator className="my-5" />

      <div className="px-5 pb-5">
        <InputBox handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
export default DetailChat;
