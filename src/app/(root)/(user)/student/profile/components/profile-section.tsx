import { ChevronsUpDownIcon } from "lucide-react";

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
  achievements: AchivementType[];
}

const ProfileSection = ({ title, achievements }: IProps) => {
  return (
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
      </div>

      <Progress value={100} className="h-1 w-[100px]" />

      <CollapsibleContent className="space-y-5 pt-2">
        {achievements.length > 0 ? (
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
              isEdit={false}
              handleEdit={() => {
                // handleSetFormEdit(achievement);
                // setEditAchievementId(achievement.id);
              }}
              handleDelete={() => {
                // setDeleteAchievementId(achievement.id);
              }}
              type={achievement.type}
            />
          ))
        ) : (
          <p>Không có</p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
export default ProfileSection;
