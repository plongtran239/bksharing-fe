"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ScheduleApi from "@/apis/schedule.api";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/datetime-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DAY_OF_WEEK } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { EntityError } from "@/lib/exceptions";
import {
  ScheduleDurationType,
  ScheduleRequest,
  ScheduleRequestType,
} from "@/schemas/schedule.schema";

const Scheduling = () => {
  const t = useTranslations("dateOfWeek");

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [scheduleDuration, setScheduleDuration] = useState<
    ScheduleDurationType[]
  >([]);

  useEffect(() => {
    const fetchScheduleDuration = async () => {
      try {
        const {
          payload: { data },
        } = await ScheduleApi.getScheduleDuration();

        setScheduleDuration(data);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDuration();
  }, []);

  const form = useForm<ScheduleRequestType>({
    resolver: zodResolver(ScheduleRequest),
    defaultValues: {
      dayOfWeek: DAY_OF_WEEK.MONDAY,
      startTime: new Date(new Date().setHours(6, 0, 0, 0)),
      duration: 1,
      courseId: undefined,
    },
  });

  const onSubmit = async (values: ScheduleRequestType) => {
    try {
      setLoading(true);

      await ScheduleApi.createSchedule(values);

      router.refresh();

      toast({
        title: "Thành công",
        description: "Thêm lịch thành công",
      });
    } catch (error) {
      console.error({ error });

      if (error instanceof EntityError) {
        toast({
          title: "Lỗi",
          description: "Lịch bị trùng lặp",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (scheduleDuration.length === 0) {
    return (
      <div>
        <div className="mb-5 rounded bg-[#FFF2CC] p-3 text-sm outline outline-1 outline-[#D6B656]">
          Bạn chưa có khóa học để xếp lịch! Tạo khóa học để tiếp tục.
        </div>

        <Button onClick={() => router.push("/course/create")}>
          Tạo khóa học
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="dayOfWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="select" required>
                Ngày trong tuần
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="select" className="capitalize">
                    <SelectValue placeholder="Select day of week" />
                  </SelectTrigger>
                  <SelectContent className="capitalize">
                    {Object.values(DAY_OF_WEEK).map((day) => (
                      <SelectItem key={day} value={day}>
                        {t(day.toLowerCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="start" required>
                Thời gian bắt đầu
              </FormLabel>
              <FormControl>
                <TimePicker
                  id="start"
                  date={field.value}
                  onChange={field.onChange}
                  granularity="minute"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({}) => (
            <FormItem>
              <FormLabel htmlFor="duration" required>
                Khóa học
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    form.setValue("courseId", parseInt(value, 10));

                    scheduleDuration.filter((duration) => {
                      if (duration.courseId === parseInt(value, 10)) {
                        form.setValue("duration", duration.duration);
                      }
                    });
                  }}
                >
                  <SelectTrigger id="select" className="capitalize">
                    <SelectValue placeholder="Chọn khóa học" />
                  </SelectTrigger>
                  <SelectContent className="capitalize" align="end">
                    {scheduleDuration.map((duration) => (
                      <SelectItem
                        key={duration.courseId}
                        value={duration.courseId.toString()}
                      >
                        {duration.name} ({duration.duration} giờ)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Thêm lịch"}
        </Button>
      </form>
    </Form>
  );
};

export default Scheduling;
