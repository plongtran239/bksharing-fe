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
      startDate: "01/01/2025",
      endDate: "31/12/2025",
      limitOfStudents: Number(body.limitOfStudents),
    }),

  getCourses: ({
    pageNumber = 1,
    pageSize = 12,
    courseName,
    categoryIds,
  }: {
    pageNumber?: number;
    pageSize?: number;
    courseName?: string;
    categoryIds?: number[];
  }) => {
    let url = `/client/courses?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (categoryIds && categoryIds.length > 0) {
      url += `&categoryIds=[${categoryIds.join(",")}]`;
    }

    if (courseName) {
      url += `&courseName=${courseName}`;
    }

    return http.get<ListResponseType<CourseType>>(url);
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

  getLearnedCourseClient: () =>
    http.get<ListResponseType<CourseType>>("/client/courses/students"),

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
