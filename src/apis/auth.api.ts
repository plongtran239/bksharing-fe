import http from "@/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemas/auth.schema";

const authApi = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),

  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/students/register", body),

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
