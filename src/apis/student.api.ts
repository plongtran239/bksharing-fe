import http from "@/lib/http";
import { convertDateToLocaleDateString } from "@/lib/utils";
import {
  AchivementRequestType,
  AchivementType,
  ListResponseType,
} from "@/schemas";

const studentApi = {
  getAchievements: () =>
    http.get<ListResponseType<AchivementType>>("/client/students/achievements"),

  addAchievement: (studentId: number, body: AchivementRequestType) =>
    http.post(`/client/students/${studentId}/achievements`, {
      ...body,
      startDate: convertDateToLocaleDateString(body.startDate),
      endDate: body.endDate
        ? convertDateToLocaleDateString(body.endDate)
        : undefined,
    }),

  updateAchievement: (
    studentId: number,
    achievementId: number,
    body: AchivementRequestType
  ) =>
    http.patch(`/client/students/${studentId}/achievements`, {
      id: achievementId,
      ...body,
      startDate: convertDateToLocaleDateString(body.startDate),
      endDate: body.endDate
        ? convertDateToLocaleDateString(body.endDate)
        : undefined,
    }),

  deleteAchievement: (studentId: number, achievementId: number) =>
    http.delete(`/client/students/${studentId}/achievements/${achievementId}`),
};

export default studentApi;
