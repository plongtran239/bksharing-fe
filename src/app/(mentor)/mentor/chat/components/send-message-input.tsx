"use client";

import { SendIcon } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

const SendMessageInput = ({
  handleSendMessage,
}: {
  handleSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  return (
    <>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Aa"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(message);
            setMessage("");
          }
        }}
        className="rounded-full"
        autoFocus
      />

      <div
        className="group cursor-pointer rounded-full border border-transparent p-2 hover:border-primary"
        onClick={() => {
          handleSendMessage(message);
          setMessage("");
        }}
      >
        <SendIcon size={16} className="text-primary" />
      </div>
    </>
  );
};
export default SendMessageInput;
