"use client";

import { ChevronsUpDownIcon, PencilIcon, PlusIcon } from "lucide-react";
import { ReactNode, useState } from "react";

import Modal from "@/app/(root)/(user)/users/[id]/components/modal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface IProps {
  title: string;
  isAbout?: boolean;
  children: ReactNode;
}

const ProfileSection = ({ title, isAbout, children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <section className="mt-5">
      <Collapsible defaultOpen>
        <div className="flex-between w-full rounded-sm">
          <CollapsibleTrigger className="w-full">
            <h2 className="flex-between group w-full gap-1 rounded-sm text-left text-2xl font-semibold text-primary hover:bg-primary/30">
              {title}
              <ChevronsUpDownIcon
                size={20}
                className="hidden group-hover:block"
              />
            </h2>
          </CollapsibleTrigger>
          <div className="flex-center gap-5 pl-5">
            {!isAbout && (
              <div
                onClick={() => {}}
                className="rounded-full p-2 hover:bg-primary hover:text-white"
              >
                <PlusIcon size={20} />
              </div>
            )}
            <div
              onClick={handleOpenModal}
              className="rounded-full p-2 hover:bg-primary hover:text-white"
            >
              <PencilIcon size={20} />
            </div>
          </div>
        </div>
        <CollapsibleContent className="mt-5">{children}</CollapsibleContent>
      </Collapsible>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};
export default ProfileSection;
