"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import chatApi from "@/apis/chat.api";
import MessageBoxContainer from "@/app/(mentor)/mentor/chat/components/message-box-container";
import SendMessageInput from "@/app/(mentor)/mentor/chat/components/send-message-input";
import Loader from "@/components/loader";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/providers/app.provider";
import { DetailRoomType, NewMessageType } from "@/schemas/chat.schema";

export type MessageType = {
  id: number;
  content: string;
  senderId: number;
};

interface IProps {
  activeChatRoomId: number | null;
}

const MessageBox = ({ activeChatRoomId }: IProps) => {
  const { socketClient } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState<DetailRoomType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

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

  useEffect(() => {
    async function fetchDetailRoom() {
      try {
        setLoading(true);
        if (activeChatRoomId) {
          const {
            payload: { data },
          } = await chatApi.getChatDetail(activeChatRoomId);

          setRoom(data);

          if (data.messages) {
            setMessages(data.messages);
          }
        }
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    }

    fetchDetailRoom();
  }, [activeChatRoomId]);

  const handleSendMessage = (message: string) => {
    if (!socketClient || !room) {
      return;
    }

    socketClient.emit("send-message", {
      message,
      type: "TEXT",
      receiverId: room.receiver.id,
    });
  };

  if (!room) {
    return null;
  }

  if (loading) {
    return (
      <div className="col-span-2 h-full rounded-xl border border-primary">
        <Loader />
      </div>
    );
  }

  return (
    <div className="col-span-2 rounded-xl border border-primary">
      <div className="flex items-center justify-between rounded-t-xl p-4">
        <div className="flex w-full items-center gap-3">
          <div className="relative h-12 w-12">
            <Image
              src="/images/default-user.png"
              alt="mentor"
              fill
              className="rounded-full"
            />
          </div>
          <p className="font-semibold text-black">{room.receiver.name}</p>
        </div>
      </div>

      <Separator className="bg-primary" />

      <div className="p-5">
        <MessageBoxContainer messages={messages} />
      </div>

      <Separator className="bg-primary" />

      <div className="flex-center gap-5 px-5 pt-5">
        <SendMessageInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
export default MessageBox;
