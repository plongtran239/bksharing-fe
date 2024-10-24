"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDownIcon, PencilIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import userApi from "@/apis/user.api";
import AchievementModal from "@/app/(root)/(user)/users/[slug]/components/achievement-modal";
import Achievement from "@/components/achievement";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { convertToCapitalizeCase } from "@/lib/utils";
import {
  AchivementRequest,
  AchivementRequestType,
  AchivementType,
} from "@/schemas";

interface IProps {
  title: string;
  type: ACHIEVEMENT_TYPES | "ABOUT";
  bio?: string;
  achievements?: AchivementType[];
  mentorId: number;
  isOwnProfile: boolean;
}

const ProfileSection = ({
  title,
  type,
  achievements,
  bio,
  mentorId,
  isOwnProfile,
}: IProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [bioValue, setBioValue] = useState(bio || "");
  const form = useForm<AchivementRequestType>({
    resolver: zodResolver(AchivementRequest),
    defaultValues: {
      achievementType: type as ACHIEVEMENT_TYPES,
      description: "",
      organization: "",
      startDate: undefined,
      endDate: undefined,
      major: "",
      position: "",
      name: "",
    },
  });

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleCancel = () => {
    setIsOpenModal(false);

    type === "ABOUT" ? setBioValue(bio as string) : form.reset();
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      type === "ABOUT"
        ? await userApi.updateMe({ bio: bioValue })
        : await userApi.addMentorAchievement(mentorId, form.getValues());

      router.refresh();

      toast({
        title: "success",
        description: `${
          type === "ABOUT" ? "Update" : "Add"
        } ${type.toLowerCase()} successfully`,
      });

      handleOpenModal();
    } catch (error) {
      console.error({ error });
    } finally {
      type === "ABOUT" ? setBioValue(bioValue) : form.reset();

      setIsLoading(false);
    }
  };

  return (
    <section className="mt-5">
      <Collapsible defaultOpen>
        <div className="flex-between w-full gap-5 rounded-sm">
          <CollapsibleTrigger className="w-full">
            <h2 className="flex-between group w-full gap-1 rounded-sm text-left text-2xl font-semibold text-primary hover:bg-primary/30">
              {title}
              <ChevronsUpDownIcon
                size={20}
                className="hidden group-hover:block"
              />
            </h2>
          </CollapsibleTrigger>

          {isOwnProfile && type !== "ABOUT" && (
            <div
              onClick={handleOpenModal}
              className="rounded-full p-2 hover:bg-primary hover:text-white"
            >
              <PlusIcon size={20} />
            </div>
          )}

          {isOwnProfile && (
            <div
              onClick={type === "ABOUT" ? handleOpenModal : undefined}
              className="rounded-full p-2 hover:bg-primary hover:text-white"
            >
              <PencilIcon size={20} />
            </div>
          )}
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
                    {
                      [ACHIEVEMENT_TYPES.EDUCATION]: achievement.major,
                      [ACHIEVEMENT_TYPES.EXPERIENCE]: achievement.position,
                      [ACHIEVEMENT_TYPES.CERTIFICATION]: achievement.name,
                    }[achievement.type] as string
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

      {[...Object.values(ACHIEVEMENT_TYPES), "ABOUT"].map((achievementType) => (
        <AchievementModal
          key={achievementType}
          isOpen={isOpenModal && type === achievementType}
          title={`Add ${convertToCapitalizeCase(achievementType)}`}
          description={
            type === "ABOUT"
              ? "You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences."
              : `You can add your ${achievementType.toLowerCase()} here.`
          }
          type={achievementType as ACHIEVEMENT_TYPES | "ABOUT"}
          handleCancel={handleCancel}
          handleSave={handleSave}
          isLoading={isLoading}
          form={form}
          bio={bioValue}
          setBio={setBioValue}
        />
      ))}
    </section>
  );
};
export default ProfileSection;
