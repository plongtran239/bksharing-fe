import { FC, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

interface IProps {
  open: boolean;
  onOpenChange: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  children: ReactNode;
}

const AlertDialog: FC<IProps> = ({
  open,
  onOpenChange,
  onCancel,
  onConfirm,
  children,
}) => {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>{children}</DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AlertDialog;
