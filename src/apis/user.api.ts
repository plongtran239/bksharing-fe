import http from "@/lib/http";
import { MentorListResponseType } from "@/schemas/user";

const userApi = {
  me: (sessionToken: string) =>
    http.get("/accounts/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  meClient: () => http.get("/accounts/me"),

  adminMentors: (sessionToken: string) =>
    http.get<MentorListResponseType>("/admin/mentors", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};

export default userApi;
