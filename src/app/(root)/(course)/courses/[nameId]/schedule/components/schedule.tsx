"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import subscriptionApi from "@/apis/subscription.api";
import Loader from "@/components/loader";
import ScheduleTable from "@/components/schedule-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getMondayOfCurrentWeek } from "@/lib/utils";
import { ScheduleType } from "@/schemas/schedule.schema";

const Schedule = ({
  schedules,
  mentorName,
  courseId,
  courseName,
}: {
  schedules: ScheduleType[];
  mentorName: string;
  courseId: number;
  courseName: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [weekStartDate, setWeekStartDate] = useState(
    getMondayOfCurrentWeek(new Date())
  );

  const [activeSchedule, setActiveSchedule] = useState<
    | {
        scheduleId: number;
        date: string;
      }
    | undefined
  >();

  const [open, setOpen] = useState(false);

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

  const findTimeRanges = (scheduleId?: number) => {
    for (const schedule of schedules) {
      for (const timeRange of schedule.timeRanges) {
        if (timeRange.id === scheduleId) {
          return {
            schedule,
            timeRange,
          };
        }
      }
    }
    return undefined;
  };

  const handleBook = async () => {
    if (!activeSchedule) {
      return;
    }

    try {
      setLoading(true);
      await subscriptionApi.subscribe(courseId, {
        date: activeSchedule.date,
        mentorScheduleId: activeSchedule.scheduleId,
        message: `Đăng ký khóa học ${courseName} của ${mentorName}`,
      });

      toast({
        title: "Thành công",
        description: "Đặt lịch hẹn thành công, chờ xác nhận từ gia sư",
      });

      setOpen(false);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container py-10">
        <div className="flex-between">
          <h1 className="text-3xl font-semibold text-black">
            Đặt lịch hẹn với{" "}
            <span className="capitalize text-primary">{mentorName}</span>
          </h1>

          <Button onClick={() => router.back()}>Trở về</Button>
        </div>

        <Separator className="my-5" />

        <div className="flex-between">
          <div className="flex items-center gap-5">
            <div className="flex-center">
              <Button
                onClick={handlePreviousWeek}
                className="w-32 rounded-e-none px-2"
                variant="secondary"
              >
                <ChevronLeftIcon size={16} />
                Trước
              </Button>
              <Button
                onClick={handleNextWeek}
                className="w-32 rounded-s-none px-2"
                variant="secondary"
              >
                Sau
                <ChevronRightIcon size={16} />
              </Button>
            </div>

            <Button
              className="px-4"
              variant="outline"
              onClick={handleResetWeek}
            >
              Tuần hiện tại
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

          <Button
            onClick={() => setOpen(true)}
            disabled={activeSchedule === undefined}
          >
            Đặt lịch hẹn
          </Button>
        </div>

        <div className="mt-5">
          <ScheduleTable
            schedules={schedules}
            weekStartDate={weekStartDate}
            showDate
            showToday
            activeSchedule={activeSchedule}
            setActiveSchedule={setActiveSchedule}
          />
        </div>
      </div>

      <Dialog modal open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium text-black">
              Đăng ký khóa học
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <p className="text-black">
            Bạn sẽ đăng ký khóa học{" "}
            <span className="font-semibold capitalize text-primary">
              {courseName}
            </span>{" "}
            của{" "}
            <span className="font-semibold capitalize text-primary">
              {mentorName}
            </span>{" "}
          </p>

          <p className="text-black">
            Từ
            <span className="font-semibold text-primary">
              {" "}
              {findTimeRanges(activeSchedule?.scheduleId)?.timeRange.startTime}
            </span>{" "}
            đến
            <span className="font-semibold text-primary">
              {" "}
              {findTimeRanges(activeSchedule?.scheduleId)?.timeRange.endTime}
            </span>{" "}
            ngày{" "}
            <span className="font-semibold text-primary">
              {activeSchedule?.date} (Thứ{" "}
              {findTimeRanges(
                activeSchedule?.scheduleId
              )?.schedule.dayOfWeek.toLowerCase()}
              )
            </span>
            .
          </p>

          <p className="text-black">Bạn có muốn tiếp tục không?</p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleBook} disabled={loading}>
              {loading ? <Loader /> : "Đặt lịch hẹn"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Schedule;
