import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IProps {
  open: boolean;
  onOpenChange: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const AlertDialog = ({
  open,
  onOpenChange,
  onCancel,
  onConfirm,
  isLoading,
  title,
  description,
  children,
}: IProps) => {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Xóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AlertDialog;
