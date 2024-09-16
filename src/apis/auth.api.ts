import http from "@/http";
import { LoginBodyType, LoginResType } from "@/schemas/auth.schema";

const authApi = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),

  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
};

export default authApi;
