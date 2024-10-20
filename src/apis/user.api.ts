import http from "@/lib/http";
import { MentorDetailType } from "@/schemas/user";

const userApi = {
  me: (sessionToken: string) =>
    http.get("/accounts/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  meClient: () => http.get("/accounts/me"),

  getMentor: (sessionToken: string, id: string) =>
    http.get<{
      data: MentorDetailType;
      message: string;
    }>(`client/mentors/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};

export default userApi;
