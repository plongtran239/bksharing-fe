import MessageItem from "@/components/chat/message-item";
import { Separator } from "@/components/ui/separator";

const MessageList = () => {
  return (
    <div>
      <h1 className="p-4 text-2xl text-primary">
        Tin nhắn <span className="text-base">(0)</span>
      </h1>

      <Separator />

      <div className="max-h-[437px] min-w-60 overflow-y-scroll overscroll-none">
        {[1, 2, 3].map((item) => (
          <MessageItem key={item} isActive={item === 1} />
        ))}
      </div>
    </div>
  );
};
export default MessageList;
