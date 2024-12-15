"use client";

import { useEffect, useRef } from "react";

import ReceiverMessage from "@/components/chat/receiver-message";
import SenderMessage from "@/components/chat/sender-message";

const MessageBoxContainer = ({ messages }: { messages: string[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-80 space-y-2 overflow-y-scroll" ref={containerRef}>
      {messages.map((message, index) => {
        if (index % 2 === 0 || index % 3 === 0) {
          return <SenderMessage key={index} message={message} />;
        }

        return <ReceiverMessage key={index} message={message} />;
      })}
    </div>
  );
};
export default MessageBoxContainer;
