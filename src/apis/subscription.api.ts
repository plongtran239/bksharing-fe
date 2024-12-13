import http from "@/lib/http";
import { ListResponseType } from "@/schemas";
import {
  SubscriptionDetailType,
  SubscriptionType,
} from "@/schemas/subscription.schema";

const subscriptionApi = {
  subscribe: (
    courseId: number,
    body: {
      date: string;
      mentorScheduleId: number;
      message: string;
    }
  ) => http.post(`/client/subscriptions/courses/${courseId}`, body),

  getSubscriptions: (sessionToken: string) =>
    http.get<ListResponseType<SubscriptionType>>("/client/subscriptions", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getDetailSubscription: (subscriptionId: number) =>
    http.get<SubscriptionDetailType>(`/client/subscriptions/${subscriptionId}`),

  mentorApproveSubscription: (body: {
    subscriptionId: number;
    isApproved: boolean;
  }) => http.patch("/client/subscriptions/approvement", body),

  cancelSubscription: (subscriptionId: number) =>
    http.patch(`/client/subscriptions/${subscriptionId}/cancel`),
};

export default subscriptionApi;
