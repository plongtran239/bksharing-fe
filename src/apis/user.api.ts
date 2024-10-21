import http from "@/lib/http";
import { DetailResponseType, MentorType } from "@/schemas";

const userApi = {
  getMentor: (sessionToken: string, id: string) =>
    http.get<DetailResponseType<MentorType>>(`client/mentors/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};

export default userApi;
