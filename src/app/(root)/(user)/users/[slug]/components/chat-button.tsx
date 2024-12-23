"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";

const ChatButton = ({ accountId }: { accountId: number }) => {
  const { setOpenMessageBox, user, socketClient, setChatRoomId } =
    useAppContext();

  const handleChat = () => {
    if (!socketClient) {
      return;
    }

    console.log({ socketClient });

    socketClient.emit(
      "join-room",
      {
        receiverId: accountId,
      },
      (chatRoomId: number) => {
        setChatRoomId(chatRoomId);
      }
    );

    setOpenMessageBox(true);
  };

  const isOwnProfile = user?.id === accountId;

  return (
    <Button
      onClick={handleChat}
      className={cn({
        hidden: isOwnProfile,
      })}
    >
      Nhắn tin
    </Button>
  );
};
export default ChatButton;
