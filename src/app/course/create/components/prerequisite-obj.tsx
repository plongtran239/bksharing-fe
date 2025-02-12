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
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-secondary-foreground">
          Mục tiêu và yêu cầu của khóa học
        </h1>

        <p className="text-center text-black">
          Hãy cho học viên biết mục tiêu và yêu cầu của khóa học của bạn
        </p>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div className="flex-center flex-col gap-3">
          <Label htmlFor="objectives" className="text-left" required>
            Mục tiêu của khóa học
          </Label>

          {objectives.map((objective, index) => (
            <div key={index} className="flex-center w-full gap-2">
              <Input
                placeholder="Nhập mục tiêu của khóa học (tối thiểu 1)"
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
                  if (objectives.length === 1) return;

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

          {objectives.length < 5 && (
            <Button
              variant="ghost"
              onClick={() => setObjectives([...objectives, ""])}
              className="flex-center gap-2 px-3 text-primary"
            >
              <PlusIcon size={16} />
              Thêm mục tiêu
            </Button>
          )}
        </div>

        <div className="flex-center flex-col gap-3">
          <Label htmlFor="prerequisites" className="text-left">
            Yêu cầu của khóa học
          </Label>

          {prerequisites.map((pre, index) => (
            <div key={index} className="flex-center w-full gap-2">
              <Input
                placeholder="Nhập yêu cầu của khóa học"
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
                  if (prerequisites.length === 1) return;

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

          {prerequisites.length < 5 && (
            <Button
              variant="ghost"
              onClick={() => setPrerequisites([...prerequisites, ""])}
              className="flex-center gap-2 px-3 text-primary"
            >
              <PlusIcon size={16} />
              Thêm yêu cầu
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default PrerequisiteObjective;
