"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
import { ERROR_ACTION } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { EntityError } from "@/lib/exceptions";
import { getMondayOfCurrentWeek } from "@/lib/utils";
import { ScheduleType } from "@/schemas/schedule.schema";
import { MentorSubscriptionType } from "@/schemas/subscription.schema";

const Schedule = ({
  schedules,
  mentorName,
  courseId,
  courseName,
  mentorId,
}: {
  schedules: ScheduleType[];
  mentorName: string;
  courseId: number;
  courseName: string;
  mentorId: number;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const tMessages = useTranslations("messages");

  const [mentorSubscriptions, setMentorSubscriptions] = useState<
    MentorSubscriptionType[]
  >([]);

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

  useEffect(() => {
    if (schedules.length === 0) {
      toast({
        title: "Không có lịch hẹn",
        description: "Gia sư chưa cập nhật lịch hẹn",
        variant: "warning",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules]);

  useEffect(() => {
    const getMentorSubscription = async () => {
      try {
        setLoading(true);
        const {
          payload: { data },
        } = await subscriptionApi.getSubscriptionsByMentorId(mentorId);

        setMentorSubscriptions(data);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    };

    getMentorSubscription();
  }, [mentorId]);

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

      router.push("/subscriptions");

      router.refresh();

      toast({
        title: "Thành công",
        description: "Đặt lịch hẹn thành công, chờ xác nhận từ gia sư",
      });

      setOpen(false);
    } catch (error) {
      console.error({ error });

      if (error instanceof EntityError) {
        if (
          error.payload.data.action ===
          ERROR_ACTION.SUBSCRIPTION_FOR_THIS_COURSE_STILL_ACTIVE
        ) {
          toast({
            title: tMessages("error"),
            description: tMessages(
              ERROR_ACTION.SUBSCRIPTION_FOR_THIS_COURSE_STILL_ACTIVE
            ),
            variant: "destructive",
          });
        }

        if (
          error.payload.data.action ===
          ERROR_ACTION.SUBSCRIPTION_ACTIVE_OVERLAP_SCHEDULE
        ) {
          toast({
            title: tMessages("error"),
            description: tMessages(
              ERROR_ACTION.SUBSCRIPTION_ACTIVE_OVERLAP_SCHEDULE
            ),
            variant: "destructive",
          });
        }
      }

      setOpen(false);
      setActiveSchedule(undefined);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="container py-10">
        <div className="flex-between">
          <div className="flex items-center gap-10">
            <h1 className="text-3xl font-semibold text-black">
              Đặt lịch hẹn với{" "}
              <span className="capitalize text-primary">{mentorName}</span>
            </h1>

            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-primary"></div>
              <span>Còn trống</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-red-500"></div>
              <span>Đã được đặt</span>
            </div>
          </div>

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
            mentorSubscriptions={mentorSubscriptions}
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
