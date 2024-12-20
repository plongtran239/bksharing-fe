"use client";

import { useEffect, useRef } from "react";

import { MessageType } from "@/components/chat/detail-chat";
import ReceiverMessage from "@/components/chat/receiver-message";
import SenderMessage from "@/components/chat/sender-message";
import { useAppContext } from "@/providers/app.provider";

const MessageBoxContainer = ({ messages }: { messages: MessageType[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAppContext();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-sm text-foreground">Chưa có tin nhắn.</p>
      </div>
    );
  }

  return (
    <div
      className="h-80 space-y-2 overflow-y-scroll overscroll-none"
      ref={containerRef}
    >
      {messages.map((message, index) => {
        if (message.senderId === user?.id) {
          return <SenderMessage key={index} message={message.content} />;
        }

        return <ReceiverMessage key={index} message={message.content} />;
      })}
    </div>
  );
};
export default MessageBoxContainer;
