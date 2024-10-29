import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CourseType } from "@/schemas";

const InputInfo = ({ form }: { form: UseFormReturn<CourseType> }) => {
  return (
    <div className="container space-y-10">
      <h1 className="text-center text-3xl font-semibold text-secondary-foreground">
        Enter the course name and description.
      </h1>

      <p className="text-center text-black">
        It&apos;s ok if you can&apos;t think of a good name now. You can change
        it later.
      </p>

      <div className="space-y-10">
        <div className="flex-center flex-col gap-2">
          <Label htmlFor="name" required className="text-left">
            Course name
          </Label>
          <Input
            id="name"
            placeholder="Enter course name..."
            className="w-1/2"
            {...form.register("name")}
          />
        </div>

        <div className="flex-center flex-col gap-2">
          <Label htmlFor="description" className="text-left">
            Course description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter course description..."
            className="w-1/2"
            rows={5}
            {...form.register("description")}
          />
        </div>
      </div>
    </div>
  );
};
export default InputInfo;
