import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import { MultiSelect } from "@/components/multi-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TARGET_AUDIENCE } from "@/constants/enum";
import { CourseRequestType } from "@/schemas";

const TargetAudiencePrice = ({
  form,
}: {
  form: UseFormReturn<CourseRequestType>;
}) => {
  const t = useTranslations("targetAudience");

  return (
    <div className="space-y-10 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-secondary-foreground">
          Giá & đối tượng mục tiêu của khóa học
        </h1>

        <p className="text-center text-black">
          Hãy đặt giá và chọn đối tượng mục tiêu cho khóa học của bạn
        </p>
      </div>

      <div className="space-y-20">
        <div className="flex-center flex-col gap-2">
          <Label required htmlFor="price" className="text-left">
            Giá khóa học
          </Label>
          <Input
            id="price"
            type="number"
            placeholder="Nhập giá khóa học"
            className="w-1/2"
            {...form.register("price")}
          />
        </div>

        <div className="flex-center flex-col gap-2">
          <Label required htmlFor="targetAudiences" className="text-left">
            Đối tượng mục tiêu
          </Label>
          <MultiSelect
            id="targetAudiences"
            placeholder="Select target audiences..."
            options={Object.values(TARGET_AUDIENCE).map((audience) => ({
              label: t(audience),
              value: audience,
            }))}
            maxCount={4}
            onValueChange={(value) => {
              form.setValue("targetAudiences", value as TARGET_AUDIENCE[]);
            }}
            defaultValue={
              form.getValues("targetAudiences")
                ? form.getValues("targetAudiences")
                : []
            }
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
};
export default TargetAudiencePrice;
