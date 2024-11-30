import { z } from "zod";

import { DAY_OF_WEEK } from "@/constants/enum";

const ScheduleRequest = z
  .object({
    dayOfWeek: z.nativeEnum(DAY_OF_WEEK),
    startTime: z.date(),
    duration: z.number(),
  })
  .superRefine(({ startTime }, ctx) => {
    if (
      (startTime.getHours() < 6 && startTime.getHours() !== 0) ||
      (startTime.getHours() > 23 && startTime.getMinutes() > 0)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Start time must be between 6:00 and 23:00",
        path: ["startTime"],
      });
    }
  });

const DaySchedule = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

const Schedule = z.object({
  dayOfWeek: z.nativeEnum(DAY_OF_WEEK),
  timeRanges: z.array(DaySchedule),
});

type ScheduleRequestType = z.infer<typeof ScheduleRequest>;
type DayScheduleType = z.infer<typeof DaySchedule>;
type ScheduleType = z.infer<typeof Schedule>;

export { ScheduleRequest, DaySchedule, Schedule };

export type { ScheduleRequestType, DayScheduleType, ScheduleType };
