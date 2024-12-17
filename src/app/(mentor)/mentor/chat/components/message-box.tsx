import { SendIcon } from "lucide-react";
import Image from "next/image";

import MessageBoxContainer from "@/app/(mentor)/mentor/chat/components/message-box-container";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const MessageBox = () => {
  return (
    <div>
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
          <p className="font-semibold text-black">Nguyễn Văn A</p>
        </div>
      </div>

      <Separator className="bg-primary" />

      <div className="p-5">
        <MessageBoxContainer messages={["123", "123123"]} />
      </div>

      <Separator className="bg-primary" />

      <div className="flex-center gap-5 px-5 pt-5">
        <Input placeholder="Aa" />

        <div className="rounded-full border border-transparent p-2 hover:border-primary">
          <SendIcon size={20} className="text-primary" />
        </div>
      </div>
    </div>
  );
};
export default MessageBox;
