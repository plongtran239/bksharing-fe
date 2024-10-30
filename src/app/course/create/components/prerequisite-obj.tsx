import { PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CourseRequestType } from "@/schemas";

const PrerequisiteObjective = ({
  form,
}: {
  form: UseFormReturn<CourseRequestType>;
}) => {
  const [prerequisites, setPrerequisites] = useState<string[]>(
    form.getValues("prerequisites").length > 0
      ? form.getValues("prerequisites")
      : [""]
  );

  const [objectives, setObjectives] = useState<string[]>(
    form.getValues("objectives").length > 0
      ? form.getValues("objectives")
      : [""]
  );

  return (
    <div className="container space-y-10 text-center">
      <h1 className="text-3xl font-semibold text-secondary-foreground">
        Enter the course prerequisites and objectives.
      </h1>

      <p className="text-center text-black">
        Tell your students what they need to know before taking this course.
      </p>

      <div className="space-y-10">
        <div className="flex-center flex-col gap-3">
          <Label htmlFor="objectives" className="text-left">
            Course objectives
          </Label>

          {objectives.map((objective, index) => (
            <div key={index} className="flex-center w-full gap-2">
              <Input
                placeholder="Enter course objectives..."
                className="w-1/2"
                value={objective}
                onChange={(e) => {
                  const newObjectives = [...objectives];
                  newObjectives[index] = e.target.value;
                  setObjectives(newObjectives);
                  form.setValue("objectives", newObjectives);
                }}
              />
              <Button
                onClick={() => {
                  const newObjectives = [...objectives];
                  newObjectives.splice(index, 1);
                  setObjectives(newObjectives);
                  form.setValue("objectives", newObjectives);
                }}
                className="px-3"
              >
                <TrashIcon size={16} />
              </Button>
            </div>
          ))}

          <Button
            variant="ghost"
            onClick={() => setObjectives([...objectives, ""])}
            className="flex-center gap-2 px-3 text-primary"
          >
            <PlusIcon size={16} />
            Add more objective
          </Button>
        </div>

        <div className="flex-center flex-col gap-3">
          <Label htmlFor="prerequisites" className="text-left">
            Course prerequisites / requirements
          </Label>

          {prerequisites.map((pre, index) => (
            <div key={index} className="flex-center w-full gap-2">
              <Input
                placeholder="Enter course prerequisites / requirements..."
                className="w-1/2"
                value={pre}
                onChange={(e) => {
                  const newPrerequisites = [...prerequisites];
                  newPrerequisites[index] = e.target.value;
                  setPrerequisites(newPrerequisites);
                  form.setValue("prerequisites", newPrerequisites);
                }}
              />
              <Button
                onClick={() => {
                  const newPrerequisites = [...prerequisites];
                  newPrerequisites.splice(index, 1);
                  setPrerequisites(newPrerequisites);
                  form.setValue("prerequisites", newPrerequisites);
                }}
                className="px-3"
              >
                <TrashIcon size={16} />
              </Button>
            </div>
          ))}

          <Button
            variant="ghost"
            onClick={() => setPrerequisites([...prerequisites, ""])}
            className="flex-center gap-2 px-3 text-primary"
          >
            <PlusIcon size={16} />
            Add more prerequisite / requirement
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PrerequisiteObjective;
