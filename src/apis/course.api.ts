import http from "@/lib/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import {
  CourseDetailType,
  CourseRequestType,
  CourseType,
  DetailResponseType,
  ListResponseType,
  SectionRequestType,
} from "@/schemas";

const courseApi = {
  createCourse: (body: CourseRequestType) =>
    http.post("/client/courses", {
      ...body,
      price: Number(body.price),
      totalDuration: Number(body.totalDuration),
      startDate: convertDateToLocaleDateString(body.startDate),
      endDate: convertDateToLocaleDateString(body.endDate),
    }),

  getCourses: (filter?: { courseName?: string; categoryIds?: number[] }) => {
    const url = `/client/courses${
      filter?.courseName ? `?courseName=${filter?.courseName}` : ""
    }${filter?.courseName && filter?.categoryIds ? "&" : ""}${
      filter?.categoryIds
        ? `${filter?.courseName ? "" : "?"}categoryIds=[${filter?.categoryIds.join(",")}]`
        : ""
    }`;

    return http.get<ListResponseType<CourseType>>(url, {
      cache: "no-store",
    });
  },

  getCoursesByMentorId: (
    sessionToken: string,
    mentorId: number,
    status?: string
  ) => {
    const url = `/client/mentors/${mentorId}/courses${
      status ? `?courseStatus=${status}` : ""
    }`;

    return http.get<ListResponseType<CourseType>>(url, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },

  getLearnedCourses: (sessionToken: string) =>
    http.get<ListResponseType<CourseType>>("/client/courses/students", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

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

  addCourseSection: (courseId: number, body: SectionRequestType) =>
    http.post(`/client/courses/${courseId}/sections`, body),

  updateCourseSections: (
    courseId: number,
    sectionId: number,
    body: Partial<SectionRequestType>
  ) => {
    return http.patch(
      `/client/courses/${courseId}/sections/${sectionId}`,
      body
    );
  },

  deleteCourseSection: (courseId: number, sectionId: number) =>
    http.delete(`/client/courses/${courseId}/sections/${sectionId}`),
};

export default courseApi;
