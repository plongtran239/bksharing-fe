import { FC, ReactNode } from "react";

import Loader from "@/components/loader";
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
  isLoading: boolean;
  children: ReactNode;
}

const AlertDialog: FC<IProps> = ({
  open,
  onOpenChange,
  onCancel,
  onConfirm,
  isLoading,
  children,
}) => {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>{children}</DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AlertDialog;
