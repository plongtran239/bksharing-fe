import http from "@/lib/http";
import { ListResponseType } from "@/schemas";
import { ScheduleRequestType, ScheduleType } from "@/schemas/schedule.schema";

const ScheduleApi = {
  createSchedule: (body: ScheduleRequestType) =>
    http.post("/client/mentors/schedules", {
      ...body,
      startTime: body.startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      endTime: body.endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }),

  deleteSchedule: (id: number) =>
    http.delete(`/client/mentors/schedules/${id}`),

  getSchedules: (sessionToken: string) =>
    http.get<ListResponseType<ScheduleType>>("/client/mentors/schedules", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};

export default ScheduleApi;
