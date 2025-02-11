import http from "@/lib/http";
import { AchivementType, ListResponseType } from "@/schemas";

const studentApi = {
  getAchievements: () =>
    http.get<ListResponseType<AchivementType>>("/client/students/achievements"),
};

export default studentApi;
