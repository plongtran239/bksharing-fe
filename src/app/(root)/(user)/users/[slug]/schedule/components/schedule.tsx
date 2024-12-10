"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

import ScheduleTable from "@/components/schedule-table";
import { Button } from "@/components/ui/button";
import { getMondayOfCurrentWeek } from "@/lib/utils";
import { ScheduleType } from "@/schemas/schedule.schema";

const Schedule = ({ schedules }: { schedules: ScheduleType[] }) => {
  const [weekStartDate, setWeekStartDate] = useState(
    getMondayOfCurrentWeek(new Date())
  );

  const startDate = weekStartDate.toLocaleDateString("vi-VN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const endDate = new Date(weekStartDate);
  endDate.setDate(weekStartDate.getDate() + 6);

  const handlePreviousWeek = () => {
    const previousWeek = new Date(weekStartDate);

    previousWeek.setDate(weekStartDate.getDate() - 7);

    setWeekStartDate(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(weekStartDate);

    nextWeek.setDate(weekStartDate.getDate() + 7);

    setWeekStartDate(nextWeek);
  };

  const handleResetWeek = () => {
    setWeekStartDate(getMondayOfCurrentWeek(new Date()));
  };

  return (
    <div className="container py-10">
      <div className="flex-between">
        <div className="flex items-center gap-5">
          <div className="flex-center">
            <Button
              onClick={handlePreviousWeek}
              className="w-32 rounded-e-none px-2"
              variant="secondary"
            >
              <ChevronLeftIcon size={16} />
              Previous
            </Button>
            <Button
              onClick={handleNextWeek}
              className="w-32 rounded-s-none px-2"
              variant="secondary"
            >
              Next
              <ChevronRightIcon size={16} />
            </Button>
          </div>

          <Button className="px-4" variant="outline" onClick={handleResetWeek}>
            This Week
          </Button>

          <p className="text-2xl font-semibold text-black">
            {startDate} -{" "}
            {endDate.toLocaleDateString("vi-VN", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <Button>Đặt lịch hẹn</Button>
      </div>

      <div className="mt-10">
        <ScheduleTable
          schedules={schedules}
          weekStartDate={weekStartDate}
          showDate
          showToday
        />
      </div>
    </div>
  );
};
export default Schedule;
