"usse client";

import { PencilIcon, TrashIcon } from "lucide-react";

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
}: IProps) => {
  const start = convertMilisecondsToLocaleDateString(startDate).slice(3);

  const end = endDate
    ? convertMilisecondsToLocaleDateString(endDate).slice(3)
    : "Now";

  return (
    <div
      className={cn("flex justify-between", {
        "bg-slate-100": isEdit,
      })}
    >
      <div className="w-4/6 space-y-1">
        {/* name / position / major */}
        <p className="text-lg font-semibold text-secondary-foreground">
          {field}
        </p>

        {/* organization */}
        <p className="text-black">{organization}</p>

        {/* description */}
        <p className="text-sm text-foreground/70">
          {description || "No description"}
        </p>
      </div>

      {/* start date - end date */}
      <div className="flex gap-5">
        <span>
          {start} - {end}
        </span>
        {isEdit && (
          <div className="flex-center flex-col gap-2 rounded-l-xl bg-secondary">
            <div className="p-2 hover:text-primary" onClick={handleEdit}>
              <PencilIcon size={16} className="" />
            </div>

            <div className="p-2 hover:text-destructive" onClick={handleDelete}>
              <TrashIcon size={16} className="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Achievement;
