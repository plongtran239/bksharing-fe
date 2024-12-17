import MessageBox from "@/app/(mentor)/mentor/chat/components/message-box";
import MessageList from "@/app/(mentor)/mentor/chat/components/message-list";

const ChatPage = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-1">
        <MessageList />
      </div>

      <div className="col-span-2 rounded-xl border border-primary">
        <MessageBox />
      </div>
    </div>
  );
};
export default ChatPage;
