import http from "@/lib/http";
import { DetailResponseType, ListResponseType } from "@/schemas";
import { MakePaymentResponseType } from "@/schemas/payment.schema";
import {
  MentorSubscriptionType,
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

  getDetailSubscriptionServer: (sessionToken: string, subscriptionId: number) =>
    http.get<SubscriptionDetailType>(
      `/client/subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  mentorApproveSubscription: (body: {
    subscriptionId: number;
    isApproved: boolean;
  }) => http.patch("/client/subscriptions/approvement", body),

  cancelSubscription: (subscriptionId: number) =>
    http.patch(`/client/subscriptions/${subscriptionId}/cancel`),

  makePaymentSubScription: (
    subscriptionId: number,
    body: { message: string }
  ) =>
    http.post<DetailResponseType<MakePaymentResponseType>>(
      `/client/subscriptions/${subscriptionId}/payments`,
      body
    ),

  continueMakePaymentSubscription: (
    subscriptionId: number,
    body: { message: string }
  ) =>
    http.put<DetailResponseType<MakePaymentResponseType>>(
      `/client/subscriptions/${subscriptionId}/payments`,
      body
    ),

  getSubscriptionsByMentorId: (mentorId: number) =>
    http.get<ListResponseType<MentorSubscriptionType>>(
      `client/subscriptions/mentors/${mentorId}`
    ),
};

export default subscriptionApi;
