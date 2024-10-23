"use client";

import { ChevronsUpDownIcon, PencilIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import Modal from "@/app/(root)/(user)/users/[id]/components/modal";
import Achievement from "@/components/achievement";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { AchivementType } from "@/schemas";

interface IProps {
  title: string;
  type: ACHIEVEMENT_TYPES | "ABOUT";
  bio?: string;
  achievements?: AchivementType[];
}

// type achievementType = {
//   type: ACHIEVEMENT_TYPES;
//   major?: string;
//   position?: string;
//   name?: string;
//   organization?: string;
//   description?: string;
//   startDate?: string;
//   endDate?: string;
// };

const ProfileSection = ({ title, type, achievements, bio }: IProps) => {
  const [isOpenAbout, setIsOpenAbout] = useState(false);

  const [isOpenEducation, setIsOpenEducation] = useState(false);

  const [isOpenExperience, setIsOpenExperience] = useState(false);

  const [isOpenCertification, setIsOpenCertification] = useState(false);

  const [bioValue, setBioValue] = useState(bio);

  // TODO: Implement achievement modal
  // const [achievementValue, setAchievementValue] =
  //   useState<achievementType | null>(null);

  const handleOpenModal = () => {
    switch (type) {
      case "ABOUT":
        setIsOpenAbout(true);
        break;
      case ACHIEVEMENT_TYPES.EDUCATION:
        setIsOpenEducation(true);
        break;
      case ACHIEVEMENT_TYPES.EXPERIENCE:
        setIsOpenExperience(true);
        break;
      case ACHIEVEMENT_TYPES.CERTIFICATION:
        setIsOpenCertification(true);
        break;
      default:
        break;
    }
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
            {type !== "ABOUT" && (
              <div
                onClick={handleOpenModal}
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

        <Progress value={100} className="h-1 w-[100px]" />

        <CollapsibleContent className="space-y-5 pt-2">
          {type === "ABOUT" && (bio ? <p>{bio}</p> : <p>No about</p>)}

          {type !== "ABOUT" &&
            (achievements && achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <Achievement
                  key={index}
                  field={
                    (() => {
                      switch (achievement.type) {
                        case ACHIEVEMENT_TYPES.EDUCATION:
                          return achievement.major;
                        case ACHIEVEMENT_TYPES.EXPERIENCE:
                          return achievement.position;
                        case ACHIEVEMENT_TYPES.CERTIFICATION:
                          return achievement.name;
                        default:
                          return "";
                      }
                    })() as string
                  }
                  organization={achievement.organization}
                  description={achievement.description}
                  startDate={achievement.startDate}
                  endDate={achievement.endDate}
                />
              ))
            ) : (
              <p>No {title.toLowerCase()}</p>
            ))}
        </CollapsibleContent>
      </Collapsible>

      {/* About Modal */}
      <Modal
        isOpen={isOpenAbout}
        setIsOpen={setIsOpenAbout}
        title="Edit About"
        description="You can write about your years of experience, industry, or skills.
            People also talk about their achievements or previous job
            experiences."
        type={type}
        handleCancel={() => {
          setBioValue(bio);
          setIsOpenAbout(false);
        }}
        handleSave={() => {
          console.log(bioValue);
          setIsOpenAbout(false);
        }}
      />

      {/* Education Modal */}
      <Modal
        isOpen={isOpenEducation}
        setIsOpen={setIsOpenEducation}
        title="Add Education"
        description="You can add your educational qualifications here."
        type={type}
        handleCancel={() => {
          setIsOpenEducation(false);
        }}
        handleSave={() => {}}
      />

      {/* Experience Modal */}
      <Modal
        isOpen={isOpenExperience}
        setIsOpen={setIsOpenExperience}
        title="Add Experience"
        description="You can add your work experiences here."
        type={type}
        handleCancel={() => {
          setIsOpenExperience(false);
        }}
        handleSave={() => {}}
      />

      {/* Certification Modal */}
      <Modal
        isOpen={isOpenCertification}
        setIsOpen={setIsOpenCertification}
        title="Add Certification"
        description="You can add your certifications here."
        type={type}
        handleCancel={() => {
          setIsOpenCertification(false);
        }}
        handleSave={() => {}}
      />
    </section>
  );
};
export default ProfileSection;
