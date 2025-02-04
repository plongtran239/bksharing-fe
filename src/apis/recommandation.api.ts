import envConfig from "@/config";
import http from "@/lib/http";
import { DetailResponseType } from "@/schemas";
import {
  MentorRecommandationListType,
  MentorsDTOType,
} from "@/schemas/recommandation.schema";

const recommandationApi = {
  getMentorRecommandations: async (
    studentId: number
  ): Promise<{
    status: number;
    payload: MentorRecommandationListType;
  }> => {
    const url = `${envConfig.NEXT_PUBLIC_RECOMMANDATION_URL}/recommendations/content-based-filtering/${studentId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommandations");
    }

    const payload: MentorRecommandationListType = await response.json();

    const data = {
      status: response.status,
      payload,
    };

    return data;
  },

  getMentorsByIds: async (mentorIds: number[]) =>
    http.post<DetailResponseType<MentorsDTOType>>(
      "/client/mentors/recommendations",
      { accountIds: mentorIds }
    ),
};

export default recommandationApi;
