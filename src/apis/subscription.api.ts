import { SUBSCRIPTION_STATUS } from "@/constants/enum";
import http from "@/lib/http";
import { DetailResponseType, ListResponseType } from "@/schemas";
import { MakePaymentResponseType } from "@/schemas/payment.schema";
import {
  AdminSubscriptionType,
  CombinationSubscriptionType,
  DetailCombinationSubscriptionType,
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

  getAdminSubscriptions: (sessionToken: string) =>
    http.get<ListResponseType<AdminSubscriptionType>>("/admin/subscriptions", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getAdminSubscriptionDetail: (sessionToken: string, subscriptionId: number) =>
    http.get<SubscriptionDetailType>(`/admin/subscriptions/${subscriptionId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getCombinationSubscriptions: (
    sessionToken: string,
    status: SUBSCRIPTION_STATUS
  ) =>
    http.get<ListResponseType<CombinationSubscriptionType>>(
      "/client/subscriptions/combination?status=" + status,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  getAdminCombinationSubscriptions: (
    sessionToken: string,
    status: SUBSCRIPTION_STATUS
  ) =>
    http.get<ListResponseType<CombinationSubscriptionType>>(
      "/admin/subscriptions/combination?status=" + status,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  getAdminDetailCombinationSubscriptions: (
    sessionToken: string,
    subscriptionId: number
  ) =>
    http.get<DetailResponseType<DetailCombinationSubscriptionType>>(
      `/admin/subscriptions/${subscriptionId}/combination`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  getDetailCombinationSubscription: (
    sessionToken: string,
    subscriptionId: number
  ) =>
    http.get<DetailResponseType<DetailCombinationSubscriptionType>>(
      `/client/subscriptions/${subscriptionId}/combination`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
};

export default subscriptionApi;
