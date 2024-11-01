import http from "@/lib/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import {
  CourseDetailType,
  CourseRequestType,
  CourseType,
  DetailResponseType,
  ListResponseType,
  UpdateCourseSectionRequestType,
} from "@/schemas";

const courseApi = {
  createCourse: (body: CourseRequestType) =>
    http.post("/client/courses", {
      ...body,
      price: Number(body.price),
      startDate: convertDateToLocaleDateString(body.startDate),
      endDate: convertDateToLocaleDateString(body.endDate),
    }),

  getCourses: () => http.get<ListResponseType<CourseType>>("/client/courses"),

  getCoursesByMentorId: (sessionToken: string, mentorId: number) =>
    http.get<ListResponseType<CourseType>>(
      `/client/mentors/${mentorId}/courses`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  getCourseById: (sessionToken: string, courseId: number) =>
    http.get<DetailResponseType<CourseDetailType>>(
      `/client/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  updateCourse: (courseId: number, body: Partial<CourseRequestType>) =>
    http.patch(`/client/courses/${courseId}`, {
      ...body,
      price: Number(body.price),
      startDate: body.startDate
        ? convertDateToLocaleDateString(body.startDate)
        : undefined,
      endDate: body.endDate
        ? convertDateToLocaleDateString(body.endDate)
        : undefined,
    }),

  updateCourseSections: (
    courseId: number,
    body: UpdateCourseSectionRequestType
  ) => {
    return http.patch(`/client/courses/${courseId}/sections`, body);
  },
};

export default courseApi;
