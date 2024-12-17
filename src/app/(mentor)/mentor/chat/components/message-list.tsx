import MessageItem from "@/app/(mentor)/mentor/chat/components/message-item";
import { Separator } from "@/components/ui/separator";

const MessageList = () => {
  return (
    <div className="h-[720px] min-w-60 overflow-y-scroll overscroll-none rounded-xl border border-primary">
      <h1 className="px-5 py-6 text-2xl font-semibold text-primary">
        Tin nhắn <span className="text-xl">(1)</span>
      </h1>

      <Separator className="bg-primary" />

      {[1, 2, 3].map((item) => (
        <MessageItem key={item} isActive={item === 1} />
      ))}
    </div>
  );
};
export default MessageList;
