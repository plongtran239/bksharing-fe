import http from "@/lib/http";
import { SubscriptionType } from "@/schemas/subscription.schema";

const subcriptionApi = {
  subscribe: (
    courseId: number,
    body: {
      date: string;
      mentorScheduleId: number;
      message: string;
    }
  ) => http.post(`/client/subscriptions/courses/${courseId}`, body),

  getSubscriptions: (sessionToken: string) =>
    http.get<SubscriptionType[]>("/client/subscriptions", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getDetailSubscription: (sessionToken: string, subscriptionId: number) =>
    http.get<SubscriptionType>(`/client/subscriptions/${subscriptionId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  mentorApproveSubscription: (body: {
    subscriptionId: number;
    isApproved: boolean;
  }) => http.patch("/client/subscriptions/approvement", body),
};

export default subcriptionApi;
