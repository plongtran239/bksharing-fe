"use client";

import { useEffect, useRef } from "react";

import { MessageType } from "@/app/(mentor)/mentor/chat/components/message-box";
import ReceiverMessage from "@/components/chat/receiver-message";
import SenderMessage from "@/components/chat/sender-message";
import { useAppContext } from "@/providers/app.provider";

const MessageBoxContainer = ({ messages }: { messages: MessageType[] }) => {
  const { user } = useAppContext();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="h-[520px] space-y-2 overflow-y-scroll overscroll-none"
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
