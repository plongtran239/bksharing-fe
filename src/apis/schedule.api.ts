import { LOCALE } from "@/constants/date";
import http from "@/lib/http";
import { ListResponseType } from "@/schemas";
import {
  ScheduleDurationType,
  ScheduleRequestType,
  ScheduleType,
} from "@/schemas/schedule.schema";

const ScheduleApi = {
  createSchedule: (body: ScheduleRequestType) =>
    http.post("/client/mentors/schedules", {
      ...body,
      startTime: body.startTime.toLocaleTimeString(LOCALE, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      endTime: new Date(
        new Date().setHours(
          body.startTime.getHours() + Math.floor(body.duration),
          body.startTime.getMinutes() + (body.duration % 1) * 60
        )
      ).toLocaleTimeString(LOCALE, {
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

  getSchedulesByMentorIdAndCourseId: (
    sessionToken: string,
    mentorId: number,
    courseId: number
  ) =>
    http.get<ListResponseType<ScheduleType>>(
      `/client/mentors/${mentorId}/schedules/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  getScheduleDuration: () =>
    http.get<ListResponseType<ScheduleDurationType>>(
      "/client/mentors/schedules/durations"
    ),
};

export default ScheduleApi;
