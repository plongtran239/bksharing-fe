import { REVIEW_TYPE } from "@/constants/enum";
import http from "@/lib/http";
import { ListResponseType } from "@/schemas";
import {
  CreateFeedbackType,
  FeedbackType,
  UpdateFeedbackType,
} from "@/schemas/feedback.schema";

type FeedbackParams = {
  pageSize?: number;
  pageNumber?: number;
  relationType: REVIEW_TYPE;
  relationId: number;
};

const feedbackApi = {
  createFeedback: (body: CreateFeedbackType) =>
    http.post("/client/feedbacks", body),

  getFeedbacks: (params: FeedbackParams) => {
    const { relationType, relationId } = params;

    const pageNumber = params.pageNumber || 1;
    const pageSize = params.pageSize || 10;

    return http.get<ListResponseType<FeedbackType>>(
      `/client/feedbacks?relationType=${relationType}&relationId=${relationId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  },

  updateFeedback: (feedbackId: number, body: UpdateFeedbackType) =>
    http.put(`/client/feedbacks/${feedbackId}`, body),
};

export default feedbackApi;
