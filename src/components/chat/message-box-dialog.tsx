import DetailChat from "@/components/chat/detail-chat";
import { cn } from "@/lib/utils";

interface IProps {
  isOpen: boolean;
}

const MessageBoxDialog = ({ isOpen }: IProps) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-50 rounded-tl-xl border border-primary bg-white shadow-2xl",
        {
          hidden: !isOpen,
        }
      )}
    >
      <DetailChat />
    </div>
  );
};
export default MessageBoxDialog;
