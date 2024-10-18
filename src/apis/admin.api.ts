import { MENTOR_STATUS } from "@/constants/enum";
import http from "@/lib/http";
import { convertDateToLocaleString } from "@/lib/utils";
import { MentorResponseType, MentorsResponseType } from "@/schemas/user";

type MentorsQuery = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  status?: MENTOR_STATUS;
};

const adminApi = {
  getAdminMentors: (sessionToken: string, query?: MentorsQuery) => {
    const params = new URLSearchParams(query).toString();

    return http.get<MentorsResponseType>(`/admin/mentors?${params}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },

  getDetailMentor: (sessionToken: string, mentorId: number) =>
    http.get<MentorResponseType>(`/admin/mentors/${mentorId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

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
