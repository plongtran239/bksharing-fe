"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ScheduleRequestType>({
    resolver: zodResolver(ScheduleRequest),
    defaultValues: {
      dayOfWeek: undefined,
      startTime: new Date(new Date().setHours(0, 0, 0, 0)),
      endTime: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  });

  const onSubmit = async (values: ScheduleRequestType) => {
    try {
      setLoading(true);

      await ScheduleApi.createSchedule(values);

      router.refresh();

      toast({
        title: "Success",
        description: "Schedule added successfully",
      });
    } catch (error) {
      console.error({ error });

      toast({
        title: "Error",
        description: "Failed to add schedule",
        variant: "destructive",
      });
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
                Day Of Week
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="select" className="capitalize">
                    <SelectValue placeholder="Select day of week" />
                  </SelectTrigger>
                  <SelectContent className="capitalize">
                    {Object.values(DAY_OF_WEEK).map((day) => (
                      <SelectItem key={day} value={day}>
                        {day.toLowerCase()}
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
                Start Time
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
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="end" required>
                End time
              </FormLabel>
              <FormControl>
                <TimePicker
                  id="end"
                  date={field.value}
                  onChange={field.onChange}
                  granularity="minute"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Add Schedule"}
        </Button>
      </form>
    </Form>
  );
};

export default Scheduling;
