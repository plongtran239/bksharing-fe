import http from "@/lib/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import {
  LoginRequestType,
  LoginResponseType,
  MentorRegisterRequestType,
  RegisterResponseType,
  StudentRegisterRequestType,
} from "@/schemas/auth";

const authApi = {
  login: (body: LoginRequestType) =>
    http.post<LoginResponseType>("/auth/login", body),

  studentRegister: (body: StudentRegisterRequestType) =>
    http.post<RegisterResponseType>("/auth/students/register", {
      ...body,
      dob: convertDateToLocaleDateString(body.dob),
    }),

  mentorRegsiter: (body: MentorRegisterRequestType) =>
    http.post<RegisterResponseType>("/auth/mentors/register", {
      ...body,
      dob: convertDateToLocaleDateString(body.dob),
      achievements: [
        ...body.achievements.map((achievement) => ({
          ...achievement,
          startDate: convertDateToLocaleDateString(achievement.startDate),
          endDate: convertDateToLocaleDateString(achievement.endDate),
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
