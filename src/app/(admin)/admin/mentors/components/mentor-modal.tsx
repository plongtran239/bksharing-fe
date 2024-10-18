"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import adminApi from "@/apis/admin.api";
import Achievement from "@/components/achievement";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { convertToCapitalizeCase } from "@/lib/utils";
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
        const { payload } = await adminApi.getAdminMentor(mentorId);
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
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-5">
          <div className="relative h-[120px] w-[120px] rounded-full border-2 border-primary">
            <Image
              src={mentor.avatar || "/images/default-user.png"}
              alt="avatar"
              fill
              sizes="(max-width: 640px) 100px,"
            />
          </div>

          <Separator orientation="vertical" />

          <div>
            <p>
              <span className="font-semibold">Name: </span>
              {mentor.name}
            </p>
            <p>
              <span className="font-semibold">Gender: </span>
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {mentor.email}
            </p>
            <p>
              <span className="font-semibold">Phone: </span>
              {mentor.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Birthday: </span>
            </p>
          </div>
        </div>

        <Link className="inline" href={mentor.cv.url} target="_blank">
          <Button className="w-full">View CV / Resume</Button>
        </Link>

        <Separator />

        <div className="">
          <div className="max-h-[360px] space-y-5 overflow-y-scroll">
            {Object.values(ACHIEVEMENT_TYPES).map((type, index) => (
              <Collapsible key={type} defaultOpen>
                <CollapsibleTrigger className="flex-between group w-full rounded-sm py-2 transition hover:bg-primary/30">
                  <h3 className="text-xl font-semibold text-primary">
                    {convertToCapitalizeCase(type)} (0)
                  </h3>

                  <ChevronsUpDownIcon
                    size={20}
                    className="group-hover:text-primary"
                  />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-2 space-y-2">
                    <Achievement
                      field="Software Engineering"
                      organization="University of Information Technology (UIT)"
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis."
                      startDate="2021"
                      endDate="2025"
                    />

                    <Achievement
                      field="Software Engineering"
                      organization="University of Information Technology (UIT)"
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis."
                      startDate="2021"
                      endDate="2025"
                    />
                  </div>

                  {index !== Object.values(ACHIEVEMENT_TYPES).length - 1 && (
                    <Separator className="my-5" />
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default MentorModal;
