"use client";

import { ReactNode } from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

import { cn } from "@/lib/utils";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText: string;
  buttonIcon?: ReactNode;
  image?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[520px] rounded-xl border-none p-10 max-sm:w-4/5">
        <DialogTitle className="hidden">{}</DialogTitle>
        <DialogDescription className="hidden">{}</DialogDescription>
        <div className="flex-center flex-col">
          <h1
            className={cn(
              "text-2xl font-semibold text-secondary-foreground",
              className
            )}
          >
            {title}
          </h1>

          {children}

          <Button
            onClick={handleClick}
            className="flex-center mt-5 w-full gap-2"
          >
            {buttonIcon}
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
