import { UseFormReturn } from "react-hook-form";

import DateInput from "@/components/date-input";
import { Label } from "@/components/ui/label";
import { CourseType } from "@/schemas";

const SetDate = ({ form }: { form: UseFormReturn<CourseType> }) => {
  return (
    <div className="space-y-10 text-center">
      <h1 className="text-3xl font-semibold text-secondary-foreground">
        Set Start and End Date for Your Course
      </h1>

      <p className="text-center text-black">
        Set the start and end date for your course to help students know when
        your course will be available.
      </p>

      <div className="flex-center">
        <div className="flex-center w-1/2 gap-10">
          <div className="flex-center w-full flex-col gap-2">
            <Label required htmlFor="start" className="text-left">
              Start Date
            </Label>
            <DateInput
              id="start"
              defaultValue={
                form.getValues("startDate")
                  ? form.getValues("startDate").toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""
              }
              value={form.watch("startDate")}
              onChange={(value) => {
                form.setValue("startDate", value as Date);
              }}
            />
          </div>

          <div className="flex-center w-full flex-col gap-2">
            <Label required htmlFor="end" className="text-left">
              End Date
            </Label>
            <DateInput
              id="end"
              defaultValue={
                form.getValues("endDate")
                  ? form.getValues("endDate").toLocaleDateString()
                  : ""
              }
              value={form.watch("endDate")}
              onChange={(value) => {
                form.setValue("endDate", value as Date);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetDate;
