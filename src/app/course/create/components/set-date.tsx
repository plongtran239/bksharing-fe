import { vi } from "date-fns/locale";
import { UseFormReturn } from "react-hook-form";

import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Label } from "@/components/ui/label";
import { CourseRequestType } from "@/schemas";

const SetDate = ({ form }: { form: UseFormReturn<CourseRequestType> }) => {
  return (
    <div className="space-y-10 text-center">
      <h1 className="text-3xl font-semibold text-secondary-foreground">
        Đặt ngày bắt đầu và kết thúc khóa học
      </h1>

      <p className="text-center text-black">
        Đặt ngày bắt đầu và kết thúc khóa học giúp học viên có thể đăng ký học
      </p>

      <div className="flex-center">
        <div className="flex-center w-1/2 gap-10">
          <div className="flex-center w-full flex-col gap-2">
            <Label required htmlFor="start" className="text-left">
              Ngày bắt đầu khóa học
            </Label>
            <DateTimePicker
              id="start"
              value={form.getValues("startDate")}
              onChange={(value) => {
                form.setValue("startDate", value as Date);
              }}
              placeholder="Ngày bắt đầu"
              displayFormat={{ hour24: "dd/MM/yyyy" }}
              granularity="day"
              limitToCurrent={true}
              locale={vi}
            />
          </div>

          <div className="flex-center w-full flex-col gap-2">
            <Label required htmlFor="end" className="text-left">
              Ngày kết thúc khóa học
            </Label>
            <DateTimePicker
              id="end"
              value={form.getValues("endDate")}
              onChange={(value) => {
                form.setValue("endDate", value as Date);
              }}
              placeholder="Ngày kết thúc"
              displayFormat={{ hour24: "dd/MM/yyyy" }}
              granularity="day"
              locale={vi}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetDate;
