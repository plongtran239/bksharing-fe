"use client";

import Image from "next/image";
import { useState } from "react";

import CloseButton from "@/components/chat/close-button";
import InputBox from "@/components/chat/input-box";
import MessageBoxContainer from "@/components/chat/message-box-container";
import MessageList from "@/components/chat/message-list";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface IProps {
  isOpen: boolean;
}

const MessageBoxDialog = ({ isOpen }: IProps) => {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <div
      className={cn("fixed bottom-0 right-0 rounded-tl-xl bg-white shadow-xl", {
        hidden: !isOpen,
      })}
    >
      <div className="flex">
        <MessageList />

        <div className="w-96 border-l">
          <div className="flex-between px-5 pt-5">
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

          <div className="px-5">
            <MessageBoxContainer messages={messages} />
          </div>

          <Separator className="my-5" />

          <div className="px-5 pb-5">
            <InputBox setMessages={setMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageBoxDialog;
