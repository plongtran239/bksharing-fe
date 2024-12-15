"use client";

import { SendHorizonalIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { Input } from "@/components/ui/input";

const InputBox = ({
  setMessages,
}: {
  setMessages: Dispatch<SetStateAction<string[]>>;
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message) return;

    setMessages((prevMessages) => [...prevMessages, message]);

    setMessage("");
  };

  return (
    <div className="flex-center gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Aa"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        className="rounded-full"
      />

      <div
        className="group cursor-pointer rounded-full border border-transparent p-2 hover:border-primary"
        onClick={handleSendMessage}
      >
        <SendHorizonalIcon size={16} className="text-primary" />
      </div>
    </div>
  );
};
export default InputBox;
