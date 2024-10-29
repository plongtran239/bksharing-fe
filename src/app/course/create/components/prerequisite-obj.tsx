import { UseFormReturn } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CourseType } from "@/schemas";

const PrerequisiteObjective = ({
  form,
}: {
  form: UseFormReturn<CourseType>;
}) => {
  return (
    <div className="container space-y-10 text-center">
      <h1 className="text-3xl font-semibold text-secondary-foreground">
        Enter the course prerequisites and objectives.
      </h1>

      <p className="text-center text-black">
        Tell your students what they need to know before taking this course.
      </p>

      <div className="space-y-10">
        <div className="flex-center flex-col gap-2">
          <Label htmlFor="prerequisites" className="text-left">
            Course prerequisites
          </Label>
          <Textarea
            id="prerequisites"
            placeholder="Enter course prerequisites..."
            className="w-1/2"
            {...form.register("prerequisites")}
          />
        </div>

        <div className="flex-center flex-col gap-2">
          <Label htmlFor="objectives" className="text-left">
            Course objectives
          </Label>
          <Textarea
            id="objectives"
            placeholder="Enter course objectives..."
            className="w-1/2"
            {...form.register("objectives")}
          />
        </div>
      </div>
    </div>
  );
};
export default PrerequisiteObjective;
