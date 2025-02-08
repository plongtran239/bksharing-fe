import envConfig from "@/config";
import http from "@/lib/http";
import { DetailResponseType } from "@/schemas";
import {
  MentorRecommandationListType,
  MentorsDTOType,
} from "@/schemas/recommandation.schema";

const recommandationApi = {
  getContentBasedMentorRecommandations: async (
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

  getCollaborativeMentorRecommandations: async (
    studentId: number
  ): Promise<{
    status: number;
    payload: MentorRecommandationListType;
  }> => {
    const url = `${envConfig.NEXT_PUBLIC_RECOMMANDATION_URL}/recommendations/collaborative-filtering/${studentId}`;

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
