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
  reviewType: REVIEW_TYPE;
  courseId?: number;
  mentorId?: number;
};

const feedbackApi = {
  createFeedback: (body: CreateFeedbackType) =>
    http.post("/client/feedbacks", body),

  getFeedbacks: (params: FeedbackParams) => {
    const { reviewType } = params;

    const pageNumber = params.pageNumber || 1;
    const pageSize = params.pageSize || 10;

    if (reviewType === REVIEW_TYPE.MENTOR) {
      return http.get<ListResponseType<FeedbackType>>(
        `/client/feedbacks?reviewType=${reviewType}&mentorId=${params.mentorId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
    } else {
      return http.get<ListResponseType<FeedbackType>>(
        `/client/feedbacks?reviewType=${reviewType}&courseId=${params.courseId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
    }
  },

  updateFeedback: (feedbackId: number, body: UpdateFeedbackType) =>
    http.put(`/client/feedbacks/${feedbackId}`, body),
};

export default feedbackApi;
