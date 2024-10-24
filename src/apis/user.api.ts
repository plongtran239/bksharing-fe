import http from "@/lib/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import {
  AccountType,
  AchivementRequestType,
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

  updateMe: (body: Partial<AccountType>) =>
    http.patch(`accounts/me`, {
      ...body,
      dob: body.dob ? convertDateToLocaleDateString(body.dob) : undefined,
    }),

  getMentorList: () =>
    http.get<DetailResponseType<MentorType[]>>(`client/mentors`, {
      cache: "no-store",
    }),

  getMentorDetail: (mentorId: string) =>
    http.get<DetailResponseType<MentorType>>(`client/mentors/${mentorId}`),

  getMentorProfile: (sessionToken: string) =>
    http.get<DetailResponseType<MentorType>>(`client/mentors/profile`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  addMentorAchievement: (
    mentorId: number,
    achievement: AchivementRequestType
  ) =>
    http.post(`client/mentors/${mentorId}/achievements`, {
      ...achievement,
      startDate: convertDateToLocaleDateString(achievement.startDate),
      endDate: achievement.endDate
        ? convertDateToLocaleDateString(achievement.endDate)
        : undefined,
    }),

  updateMentorAchievement: (
    mentorId: number,
    achievementId: number,
    achievement: AchivementRequestType
  ) =>
    http.patch(`client/mentors/${mentorId}/achievements`, {
      ...achievement,
      id: achievementId,
      startDate: convertDateToLocaleDateString(achievement.startDate),
      endDate: achievement.endDate
        ? convertDateToLocaleDateString(achievement.endDate)
        : undefined,
    }),
};

export default userApi;
