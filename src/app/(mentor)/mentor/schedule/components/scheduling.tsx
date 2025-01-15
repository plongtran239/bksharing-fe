"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import {
  ScheduleRequest,
  ScheduleRequestType,
} from "@/schemas/schedule.schema";

const Scheduling = () => {
  const t = useTranslations("dateOfWeek");

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ScheduleRequestType>({
    resolver: zodResolver(ScheduleRequest),
    defaultValues: {
      dayOfWeek: DAY_OF_WEEK.MONDAY,
      startTime: new Date(new Date().setHours(6, 0, 0, 0)),
      duration: 1,
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
    } finally {
      setLoading(false);
    }
  };

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
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="duration" required>
                Thời lượng
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(parseFloat(value));
                  }}
                  value={field.value.toString()}
                >
                  <SelectTrigger id="select" className="capitalize">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="capitalize">
                    <SelectItem value="1">1 giờ</SelectItem>
                    <SelectItem value="1.5">1.5 giờ</SelectItem>
                    <SelectItem value="2">2 giờ</SelectItem>
                    <SelectItem value="2.5">2.5 giờ</SelectItem>
                    <SelectItem value="3">3 giờ</SelectItem>
                    <SelectItem value="3.5">3.5 giờ</SelectItem>
                    <SelectItem value="4">4 giờ</SelectItem>
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
