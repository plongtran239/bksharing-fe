import http from "@/lib/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import { CourseType, ListResponseType } from "@/schemas";

const courseApi = {
  createCourse: (body: CourseType) =>
    http.post("/client/courses", {
      ...body,
      price: Number(body.price),
      startDate: convertDateToLocaleDateString(body.startDate),
      endDate: convertDateToLocaleDateString(body.endDate),
    }),

  getCourses: () => http.get<ListResponseType<CourseType>>("/client/courses"),
};

export default courseApi;
