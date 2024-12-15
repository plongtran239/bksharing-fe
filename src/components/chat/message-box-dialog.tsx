"use client";

import Image from "next/image";
import { useState } from "react";

import CloseButton from "@/components/chat/close-button";
import InputBox from "@/components/chat/input-box";
import MessageBoxContainer from "@/components/chat/message-box-container";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface IProps {
  isOpen: boolean;
}

const MessageBoxDialog = ({ isOpen }: IProps) => {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <div
      className={cn(
        "fixed bottom-0 right-32 rounded-t-xl border border-primary bg-white p-5 shadow-xl",
        {
          hidden: !isOpen,
        }
      )}
    >
      <div className="w-72">
        <div className="flex-between">
          <div className="flex-center gap-2">
            <div className="relative h-6 w-6">
              <Image
                src={"/images/default-user.png"}
                alt=""
                fill
                className="rounded-full"
              />
            </div>
            <h1>Nguyễn Văn A</h1>
          </div>

          <CloseButton />
        </div>

        <Separator className="my-5" />

        <MessageBoxContainer messages={messages} />

        <Separator className="my-5" />

        <InputBox setMessages={setMessages} />
      </div>
    </div>
  );
};
export default MessageBoxDialog;
