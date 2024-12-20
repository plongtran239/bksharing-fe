"use client";

import { XIcon } from "lucide-react";

import { useAppContext } from "@/providers/app.provider";

const CloseButton = () => {
  const { setOpenMessageBox, setChatRoomId } = useAppContext();

  const handleclose = () => {
    setOpenMessageBox(false);
    setChatRoomId(null);
  };

  return (
    <div
      className="group cursor-pointer rounded-full p-1 hover:bg-gray-100"
      onClick={handleclose}
    >
      <XIcon className="group-hover:text-red-400" size={16} />
    </div>
  );
};
export default CloseButton;
