import { MENTOR_STATUS } from "@/constants/enum";
import http from "@/lib/http";
import { convertDateToLocaleString } from "@/lib/utils";
import { MentorResponseType, MentorsResponseType } from "@/schemas/user";

const adminApi = {
  getAdminMentors: (sessionToken: string, status?: MENTOR_STATUS) => {
    const query = status ? `?status=${status}` : "";
    return http.get<MentorsResponseType>(`/admin/mentors${query}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },

  getAdminMentor: (mentorId: number) =>
    http.get<MentorResponseType>(`/admin/mentors/${mentorId}`),

  approveMentor: (mentorId: number, isApproved: boolean) =>
    http.patch(`/admin/mentors/${mentorId}/approvement`, {
      isApproved,
    }),

  interviewMentor: (
    mentorId: number,
    body: {
      title: string;
      startsAt: Date;
    }
  ) =>
    http.post<{
      data: {
        cid: string;
        startsAt: string;
      };
      message: string;
    }>(`/admin/mentors/${mentorId}/audio-call`, {
      ...body,
      startsAt: convertDateToLocaleString(body.startsAt),
    }),
};

export default adminApi;
