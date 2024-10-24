import { Dispatch, SetStateAction } from "react";

import DateInput from "@/components/date-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
  type: ACHIEVEMENT_TYPES | "ABOUT";
  children?: React.ReactNode;
  handleCancel: () => void;
  handleSave: () => void;
}

const Modal = ({
  isOpen,
  title,
  description,
  type,
  handleCancel,
  handleSave,
}: IModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} modal>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>

          {type === "ABOUT" ? (
            <Textarea
              rows={5}
              className="my-10 text-black"
              placeholder="Enter your about..."
              // value={bioValue}
              // onChange={(e) => setBioValue(e.target.value)}
            />
          ) : (
            <div className="space-y-5 pb-5">
              <div className="space-y-1">
                <Label htmlFor={type} required>
                  {
                    {
                      [ACHIEVEMENT_TYPES.EDUCATION]: "Major",
                      [ACHIEVEMENT_TYPES.EXPERIENCE]: "Position",
                      [ACHIEVEMENT_TYPES.CERTIFICATION]: "Name",
                    }[type]
                  }
                </Label>
                <Input id={type} placeholder="enter major..." />
              </div>

              <div className="space-y-1">
                <Label htmlFor="major" required>
                  Organization
                </Label>
                <Input id="major" placeholder="enter organization..." />
              </div>

              <div className="flex-between gap-5">
                <div className="w-full space-y-1">
                  <Label htmlFor="startDate" required>
                    Start Date
                  </Label>
                  <DateInput
                    id="startDate"
                    value={new Date()}
                    onChange={() => {}}
                  />
                </div>

                <div className="w-full space-y-1">
                  <Label htmlFor="startDate" required>
                    End Date
                  </Label>
                  <DateInput
                    id="startDate"
                    value={new Date()}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="enter description..." />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
