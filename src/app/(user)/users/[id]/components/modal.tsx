import { UserPenIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ isOpen, setIsOpen }: IModalProps) => {
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal} modal>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <UserPenIcon size={20} strokeWidth={2.5} />
            Edit about
          </DialogTitle>

          <DialogDescription>
            <Label className="mt-60" htmlFor="about">
              You can write about your years of experience, industry, or skills.
              People also talk about their achievements or previous job
              experiences.
            </Label>
            <Textarea
              rows={5}
              className="my-5 text-black"
              id="about"
              placeholder="Enter your about..."
            />
          </DialogDescription>

          <DialogFooter>
            <Button variant="destructive" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button>Save</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
