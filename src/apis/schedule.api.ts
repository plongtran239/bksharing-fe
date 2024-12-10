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
      endTime: new Date(
        new Date().setHours(
          body.startTime.getHours() + Math.floor(body.duration),
          body.startTime.getMinutes() + (body.duration % 1) * 60
        )
      ).toLocaleTimeString("en-US", {
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

  getSchedulesByMentorId: (sessionToken: string, mentorId: number) =>
    http.get<ListResponseType<ScheduleType>>(
      `/client/mentors/${mentorId}/schedules`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
};

export default ScheduleApi;
