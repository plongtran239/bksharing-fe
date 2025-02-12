import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CourseRequestType } from "@/schemas";

const InputInfo = ({ form }: { form: UseFormReturn<CourseRequestType> }) => {
  return (
    <div className="flex-center">
      <div className="w-4/7 space-y-10">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-semibold text-secondary-foreground">
            Nhập tên, thời lượng, mô tả & số lượng học viên của khóa học.
          </h1>

          <p className="text-center text-black">
            Bạn hãy nhập thông tin cơ bản của khóa học.
          </p>
        </div>

        <div className="space-y-10">
          <div className="flex-center flex-col gap-2">
            <Label htmlFor="name" required className="text-left">
              Tên khóa học
            </Label>
            <Input
              id="name"
              placeholder="Nhập tên khóa học"
              {...form.register("name")}
            />
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex-center flex-col gap-2">
              <Label htmlFor="duration" className="text-left" required>
                Thời lượng khóa học (giờ)
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="Nhập thời lượng khóa học (từ 1 đến 10 giờ)"
                {...form.register("totalDuration")}
              />
            </div>

            <div className="flex-center flex-col gap-2">
              <Label htmlFor="limit" className="text-left" required>
                Số lượng học viên
              </Label>
              <Input
                id="limit"
                type="number"
                placeholder="Nhập số lượng học viên (từ 1 đến 10)"
                {...form.register("limitOfStudents")}
              />
            </div>
          </div>

          <div className="flex-center flex-col gap-2">
            <Label htmlFor="description" className="text-left">
              Mô tả khóa học
            </Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả khóa học"
              rows={5}
              {...form.register("description")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default InputInfo;
