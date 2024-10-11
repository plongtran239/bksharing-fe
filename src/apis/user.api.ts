import http from "@/lib/http";
import { MentorResponseType, MentorsResponseType } from "@/schemas/user";

const userApi = {
  me: (sessionToken: string) =>
    http.get("/accounts/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  meClient: () => http.get("/accounts/me"),

  getAdminMentors: (sessionToken: string) =>
    http.get<MentorsResponseType>("/admin/mentors", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    }),

  getAdminMentor: (id: number) =>
    http.get<MentorResponseType>(`/admin/mentors/${id}`),
};

export default userApi;
