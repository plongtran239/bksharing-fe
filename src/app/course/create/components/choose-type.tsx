import { CalendarCheck2Icon, RouteIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { COURSE_TYPE } from "@/constants/enum";
import { cn, convertToCapitalizeCase } from "@/lib/utils";
import { CourseRequestType } from "@/schemas";

const ChooseType = ({ form }: { form: UseFormReturn<CourseRequestType> }) => {
  return (
    <div className="container space-y-10 text-center">
      <h1 className="text-3xl font-semibold text-secondary-foreground">
        First, let&apos;s find out what type of course you&apos;re making.
      </h1>

      <div className="flex-center gap-10">
        {Object.values(COURSE_TYPE).map((type) => (
          <button
            key={type}
            className={cn(
              "min-h-72 w-[300px] space-y-5 rounded-xl border p-5 hover:bg-secondary",
              {
                "border-2 border-primary": form.watch("courseType") === type,
              }
            )}
            onClick={() => {
              form.setValue("courseType", type);
            }}
          >
            <div className="flex-center text-black">
              {type === COURSE_TYPE.PROGRAM && <RouteIcon size={50} />}

              {type === COURSE_TYPE.SINGLE_EVENT && (
                <CalendarCheck2Icon size={50} />
              )}
            </div>
            <p className="text-lg font-semibold text-black">
              {convertToCapitalizeCase(type)}
            </p>
            <p>
              {type === COURSE_TYPE.PROGRAM
                ? "A series of events or activities that are planned to achieve a particular aim."
                : "A single event or activity."}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
export default ChooseType;
