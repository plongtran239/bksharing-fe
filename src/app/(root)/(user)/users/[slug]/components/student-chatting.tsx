"use client";

import MessageBoxDialog from "@/components/chat/message-box-dialog";
import { useAppContext } from "@/providers/app.provider";

const StudentChatting = () => {
  const { openMessageBox } = useAppContext();

  return <MessageBoxDialog isOpen={openMessageBox} />;
};
export default StudentChatting;
