"use client";

import { useEffect, useState } from "react";

import userApi from "@/apis/user.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MentorDetailType } from "@/schemas/user";

const MentorModal = ({
  open,
  onOpenChange,
  mentorId,
}: {
  open: boolean;
  onOpenChange: () => void;
  mentorId?: number;
}) => {
  const [mentor, setMentor] = useState<MentorDetailType | undefined>(undefined);

  useEffect(() => {
    async function fetchMentor() {
      if (mentorId) {
        const { payload } = await userApi.getAdminMentor(mentorId);
        setMentor(payload.data);
      }
    }

    if (mentorId) {
      fetchMentor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorId]);

  if (!mentor) {
    return null;
  }

  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mentor Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <p>{mentor.name}</p>
          <p>{mentor.email}</p>
          <p>{mentor.phoneNumber}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default MentorModal;
