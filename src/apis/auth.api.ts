import http from "@/lib/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import {
  LoginRequestType,
  MentorRegisterRequestType,
  StudentRegisterRequestType,
} from "@/schemas";
import { AuthResponseType } from "@/schemas";

const authApi = {
  login: (body: LoginRequestType) =>
    http.post<AuthResponseType>("/auth/login", body),

  studentRegister: (body: StudentRegisterRequestType) =>
    http.post<AuthResponseType>("/auth/students/register", {
      ...body,
      dob: convertDateToLocaleDateString(body.dob),
    }),

  mentorRegsiter: (body: MentorRegisterRequestType) =>
    http.post<AuthResponseType>("/auth/mentors/register", {
      ...body,
      dob: convertDateToLocaleDateString(body.dob),
      achievements: [
        ...body.achievements.map((achievement) => ({
          ...achievement,
          startDate: convertDateToLocaleDateString(achievement.startDate),
          endDate: achievement.endDate
            ? convertDateToLocaleDateString(achievement.endDate)
            : undefined,
        })),
      ],
    }),

  auth: (body: { sessionToken: string; role: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),

  logout: () =>
    http.post(
      "/api/auth/logout",
      {},
      {
        baseUrl: "",
      }
    ),
};

export default authApi;
