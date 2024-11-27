import { z } from "zod";

import { DAY_OF_WEEK } from "@/constants/enum";

const ScheduleRequest = z.object({
  startTime: z.string(),
  endTime: z.string(),
  dayOfWeek: z.nativeEnum(DAY_OF_WEEK),
});

const Schedule = z.object({
  dayOfWeek: z.nativeEnum(DAY_OF_WEEK),
  timeRanges: z.array(
    z.object({
      id: z.number(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
});

type ScheduleRequestType = z.infer<typeof ScheduleRequest>;

type ScheduleType = z.infer<typeof Schedule>;

export { ScheduleRequest, Schedule };

export type { ScheduleRequestType, ScheduleType };
