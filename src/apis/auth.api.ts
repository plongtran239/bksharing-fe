import http from "@/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import {
  LoginBodyType,
  LoginResType,
  MentorRegisterBodyType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemas/auth.schema";

const authApi = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),

  studentRegister: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/students/register", {
      ...body,
      dob: convertDateToLocaleDateString(body.dob),
    }),

  mentorRegsiter: (body: MentorRegisterBodyType) =>
    http.post<RegisterResType>("/auth/mentors/register", {
      ...body,
      dob: convertDateToLocaleDateString(body.dob),
    }),

  auth: (body: { sessionToken: string }) =>
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
