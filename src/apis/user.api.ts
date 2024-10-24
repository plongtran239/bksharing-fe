import http from "@/lib/http";
import {
  AccountType,
  AchivementType,
  DetailResponseType,
  MentorType,
} from "@/schemas";

const userApi = {
  getMe: (sessionToken: string) =>
    http.get<DetailResponseType<AccountType>>(`accounts/me`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getMentorList: () =>
    http.get<DetailResponseType<MentorType[]>>(`client/mentors`),

  getMentorDetail: (mentorId: string) =>
    http.get<DetailResponseType<MentorType>>(`client/mentors/${mentorId}`),

  getMentorProfile: (sessionToken: string) =>
    http.get<DetailResponseType<MentorType>>(`client/mentors/profile`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  addMentorAchievement: (mentorId: number, achievement: AchivementType) =>
    http.post(`client/mentors/${mentorId}/achievements`, achievement),

  updateMentorAchievement: (
    mentorId: number,
    achievementId: number,
    achievement: AchivementType
  ) =>
    http.patch(`client/mentors/${mentorId}/achievements`, {
      id: achievementId,
      ...achievement,
    }),
};

export default userApi;
