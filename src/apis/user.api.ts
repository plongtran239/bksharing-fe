import { MENTOR_STATUS } from "@/constants/enum";
import http from "@/lib/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import {
  AccountType,
  AchivementRequestType,
  DetailResponseType,
  ListResponseType,
  MentorType,
} from "@/schemas";

const userApi = {
  changePassword: (body: { currentPassword: string; newPassword: string }) =>
    http.post("/accounts/change-password", body),

  getMe: (sessionToken: string) =>
    http.get<DetailResponseType<AccountType>>(`accounts/me`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getMeClient: () => http.get<DetailResponseType<AccountType>>(`accounts/me`),

  updateMe: (body: Partial<AccountType>) =>
    http.patch(`accounts/me`, {
      ...body,
      dob: body.dob ? convertDateToLocaleDateString(body.dob) : undefined,
    }),

  getMentorList: ({
    pageNumber = 1,
    pageSize = 10,
    name = "",
    sortBy = "meanRates",
    sortOrder = "desc",
  }: {
    pageNumber?: number;
    pageSize?: number;
    name?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    const url = `client/mentors?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${MENTOR_STATUS.ACCEPTED}&name=${name}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    console.log(url);

    return http.get<ListResponseType<MentorType>>(url, {
      cache: "no-store",
    });
  },

  getMentorDetail: (mentorId: number) =>
    http.get<DetailResponseType<MentorType>>(`client/mentors/${mentorId}`),

  getMentorProfile: (sessionToken: string) =>
    http.get<DetailResponseType<MentorType>>(`client/mentors/profile`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getMentorProfileClient: () =>
    http.get<DetailResponseType<MentorType>>(`client/mentors/profile`),

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

  deleteMentorAchievement: (mentorId: number, achievementId: number) =>
    http.delete(`client/mentors/${mentorId}/achievements/${achievementId}`),
};

export default userApi;
