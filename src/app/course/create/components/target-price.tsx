import { UseFormReturn } from "react-hook-form";

import { MultiSelect } from "@/components/multi-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TARGET_AUDIENCE } from "@/constants/enum";
import { convertToCapitalizeCase } from "@/lib/utils";
import { CourseRequestType } from "@/schemas";

const TargetAudiencePrice = ({
  form,
}: {
  form: UseFormReturn<CourseRequestType>;
}) => {
  return (
    <div className="container space-y-10 text-center">
      <h1 className="text-3xl font-semibold text-secondary-foreground">
        Enter Price and Target Audiences for Your Course
      </h1>

      <p className="text-center text-black">
        Set the price and target audiences for your course to help students find
        your course.
      </p>

      <div className="space-y-10">
        <div className="flex-center flex-col gap-2">
          <Label htmlFor="price" className="text-left">
            Price
          </Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter price..."
            className="w-1/4"
            {...form.register("price")}
          />
        </div>

        <div className="flex-center flex-col gap-2">
          <Label htmlFor="targetAudiences" className="text-left">
            Target Audiences
          </Label>
          <MultiSelect
            id="targetAudiences"
            placeholder="Select target audiences..."
            options={Object.values(TARGET_AUDIENCE).map((audience) => ({
              label: convertToCapitalizeCase(audience),
              value: audience,
            }))}
            onValueChange={(value) => {
              form.setValue("targetAudiences", value as TARGET_AUDIENCE[]);
            }}
            defaultValue={
              form.getValues("targetAudiences")
                ? form.getValues("targetAudiences")
                : []
            }
            className="w-1/4"
          />
        </div>
      </div>
    </div>
  );
};
export default TargetAudiencePrice;
