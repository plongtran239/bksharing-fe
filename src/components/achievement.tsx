"usse client";

import { PencilIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { cn, convertMilisecondsToLocaleDateString } from "@/lib/utils";

interface IProps {
  field: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
  isEdit?: boolean;
  handleEdit?: () => void;
  handleDelete?: () => void;
  type: ACHIEVEMENT_TYPES;
}

const Achievement = ({
  field,
  organization,
  description,
  startDate,
  endDate,
  isEdit,
  handleEdit,
  handleDelete,
  type,
}: IProps) => {
  const start = convertMilisecondsToLocaleDateString(startDate).slice(3);

  const end = endDate
    ? convertMilisecondsToLocaleDateString(endDate).slice(3)
    : "Hiện tại";

  const tMajor = useTranslations("major");
  const tSchool = useTranslations("school");

  const tPosition = useTranslations("position");
  const tCompany = useTranslations("company");

  const tCertification = useTranslations("certification");
  const tOrganization = useTranslations("organization");

  const renderField = (field: string) => {
    switch (type) {
      case ACHIEVEMENT_TYPES.EDUCATION:
        return tMajor(field);
      case ACHIEVEMENT_TYPES.EXPERIENCE:
        return tPosition(field);
      case ACHIEVEMENT_TYPES.CERTIFICATION:
        return tCertification(field);
    }
  };

  const renderOrganization = (organization: string) => {
    switch (type) {
      case ACHIEVEMENT_TYPES.EDUCATION:
        return tSchool(organization);
      case ACHIEVEMENT_TYPES.EXPERIENCE:
        return tCompany(organization);
      case ACHIEVEMENT_TYPES.CERTIFICATION:
        return tOrganization(organization);
    }
  };

  return (
    <div
      className={cn("flex justify-between", {
        "bg-slate-100": isEdit,
      })}
    >
      <div className="w-4/6 space-y-1">
        {/* name / position / major */}
        <p className="text-lg font-semibold text-secondary-foreground">
          {renderField(field)}
        </p>

        {/* organization */}
        <p className="text-black">{renderOrganization(organization)}</p>

        {/* description */}
        <p className="text-sm text-foreground/70">
          {description || "Không có mô tả"}
        </p>
      </div>

      {/* start date - end date */}
      <div className="flex gap-5">
        <span>
          {start} - {end}
        </span>

        {isEdit && (
          <TooltipProvider>
            <div className="flex-center flex-col gap-2 rounded-l-xl bg-secondary">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-2 hover:text-primary" onClick={handleEdit}>
                    <PencilIcon size={16} className="" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="translate-x-10 translate-y-8">
                  Edit
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="p-2 hover:text-destructive"
                    onClick={handleDelete}
                  >
                    <TrashIcon size={16} className="" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="translate-x-12 translate-y-9">
                  Delete
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};
export default Achievement;
