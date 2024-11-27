import http from "@/lib/http";
import { ListResponseType } from "@/schemas";
import { ScheduleRequestType, ScheduleType } from "@/schemas/schedule.schema";

const ScheduleApi = {
  createSchedule: (body: ScheduleRequestType) =>
    http.post("/client/mentors/schedules", body),

  deleteSchedule: (id: number) =>
    http.delete(`/client/mentors/schedules/${id}`),

  getSchedules: () =>
    http.get<ListResponseType<ScheduleType>>("/client/mentors/schedules"),
};

export default ScheduleApi;
