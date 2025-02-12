"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  PencilIcon,
  PlusIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import studentApi from "@/apis/student.api";
import AchievementModal from "@/app/(root)/(user)/users/[slug]/components/achievement-modal";
import Achievement from "@/components/achievement";
import AlertDialog from "@/components/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  AchivementRequest,
  AchivementRequestType,
  AchivementType,
} from "@/schemas";

interface IProps {
  title: string;
  type: ACHIEVEMENT_TYPES;
  bio?: string;
  achievements?: AchivementType[];
  studentId: number;
  isOwnProfile: boolean;
}

const ProfileSection = ({
  title,
  type,
  achievements,
  bio,
  studentId,
  isOwnProfile,
}: IProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [editAchievementId, setEditAchievementId] = useState<
    number | undefined
  >();

  const [deleteAchievementId, setDeleteAchievementId] = useState<
    number | undefined
  >();

  const t = useTranslations("authPage.register.mentorForm.achievementForm");

  const [bioValue, setBioValue] = useState(bio || "");

  useEffect(() => {
    setBioValue(bio as string);
  }, [bio]);

  const defaultValues = {
    bio: "",
    achievementType: type as ACHIEVEMENT_TYPES,
    description: "",
    organization: "",
    startDate: undefined,
    isCurrent: true,
    endDate: undefined,
    major: "",
    position: "",
    name: "",
  };

  const form = useForm<AchivementRequestType>({
    resolver: zodResolver(AchivementRequest),
    defaultValues,
  });

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
    form.reset(defaultValues);
    setEditAchievementId(undefined);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (!isEdit) {
        await studentApi.addAchievement(studentId, form.getValues());
      } else {
        await studentApi.updateAchievement(
          studentId,
          editAchievementId as number,
          form.getValues()
        );
      }

      router.refresh();

      toast({
        title: "Thành công",
        description: isEdit ? "Cập nhật thành công" : "Thêm thành công",
      });
    } catch (error) {
      console.error({ error });
    } finally {
      handleCancel();
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await studentApi.deleteAchievement(
        studentId,
        deleteAchievementId as number
      );

      router.refresh();

      toast({
        title: "Thành công",
        description: "Xóa thành tựu thành công",
      });
    } catch (error) {
      console.error({ error });
    } finally {
      setDeleteAchievementId(undefined);
      setIsLoading(false);
    }
  };

  const handleSetFormEdit = (achievement: AchivementType) => {
    const start = new Date(Number(achievement.startDate));

    const end = achievement.endDate
      ? new Date(Number(achievement.endDate))
      : undefined;

    form.reset({
      achievementType: achievement.type,
      organization: achievement.organization,
      description: achievement.description,
      startDate: start,
      endDate: end,
      major: achievement.major,
      position: achievement.position,
      name: achievement.name,
      isCurrent: achievement.isCurrent,
    });

    handleOpenModal();
  };

  return (
    <section className="">
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={handleOpenModal}
                  className={cn(
                    "hidden rounded-full p-2 hover:bg-primary hover:text-white",
                    {
                      block: !isEdit && isOwnProfile,
                    }
                  )}
                >
                  <PlusIcon size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent align="center">
                <p className="text-xs">Thêm {type.toLowerCase()}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => setIsEdit(!isEdit)}
                  className={cn(
                    "rounded-full p-2 hover:bg-primary hover:text-white",
                    {
                      hidden:
                        isEdit ||
                        !isOwnProfile ||
                        (achievements && achievements.length === 0),
                    }
                  )}
                >
                  <PencilIcon size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent align="center">
                <p className="text-xs">Sửa {type.toLowerCase()}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => {
                    setIsEdit(false);
                    handleCancel();
                  }}
                  className={cn(
                    "rounded-full p-2 hover:bg-primary hover:text-white",
                    {
                      hidden: !isEdit,
                    }
                  )}
                >
                  <CheckIcon size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent align="center">
                <p className="text-xs">Hoàn thành</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Progress value={100} className="h-1 w-[100px]" />

        <CollapsibleContent className="space-y-5 pt-2">
          {achievements && achievements.length > 0 ? (
            achievements.map((achievement) => (
              <Achievement
                key={achievement.id}
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
                isEdit={isEdit}
                handleEdit={() => {
                  handleSetFormEdit(achievement);
                  setEditAchievementId(achievement.id);
                }}
                handleDelete={() => setDeleteAchievementId(achievement.id)}
                type={achievement.type}
              />
            ))
          ) : (
            <p>Không có</p>
          )}
        </CollapsibleContent>
      </Collapsible>

      {[...Object.values(ACHIEVEMENT_TYPES)].map((achievementType) => (
        <AchievementModal
          key={achievementType}
          isOpen={isOpenModal && type === achievementType}
          title={`${isEdit ? "Chỉnh sửa" : "Thêm"} ${t(achievementType.toLowerCase())}`}
          description={"Nhập thông tin"}
          type={achievementType as ACHIEVEMENT_TYPES}
          handleCancel={handleCancel}
          handleSave={handleSave}
          isLoading={isLoading}
          form={form}
          bio={bioValue}
          setBio={setBioValue}
        />
      ))}

      <AlertDialog
        open={deleteAchievementId !== undefined}
        onOpenChange={() => setDeleteAchievementId(undefined)}
        onCancel={() => setDeleteAchievementId(undefined)}
        onConfirm={handleDelete}
        isLoading={isLoading}
        title="Bạn có chắc chắn muốn xóa?"
        description="Hành động này không thể hoàn tác"
      />
    </section>
  );
};
export default ProfileSection;
