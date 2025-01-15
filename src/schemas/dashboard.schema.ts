import { z } from "zod";

import { SUBSCRIPTION_STATUS } from "@/constants/enum";

const dashboardOverview = z.object({
  mentorOverview: z.object({
    approvedMentor: z.number(),
    pendingMentor: z.number(),
  }),

  courseOverview: z.object({
    approvedCourse: z.number(),
    pendingCourse: z.number(),
    suspendedCourse: z.number(),
  }),

  studentOverview: z.object({
    activeStudent: z.number(),
    suspendedStudent: z.number(),
  }),

  subscriptionOverview: z.object({
    activeSubscription: z.number(),
    pendingSubscription: z.number(),
    expiredSubscription: z.number(),
    cancelledSubscription: z.number(),
  }),

  reportOverview: z.object({
    pendingReport: z.number(),
    resolvedReport: z.number(),
  }),

  revenueOverview: z.object({
    totalRevenue: z.number(),
    refundAmount: z.number(),
  }),
});

const DashboardPayment = z.record(
  z.string(),
  z.object({
    totalAmount: z.number(),
    noOfPayments: z.number(),
  })
);

const DashboardSubscription = z.object({
  id: z.number(),
  originalPrice: z.number(),
  course: z.object({
    id: z.number(),
    name: z.string(),
  }),
  mentorInfo: z.object({
    id: z.number(),
    name: z.string(),
  }),
  studentInfo: z.object({
    id: z.number(),
    name: z.string(),
  }),
  courseStartAt: z.string(),
  status: z.nativeEnum(SUBSCRIPTION_STATUS),
});

const DashboardTopCourse = z.object({
  id: z.number(),
  name: z.string(),
  noOfSubscription: z.number().optional(),
  rate: z.number().optional(),
});

type DashboardOverviewType = z.infer<typeof dashboardOverview>;

type DashboardPaymentType = z.infer<typeof DashboardPayment>;

type DashboardSubscriptionType = z.infer<typeof DashboardSubscription>;

type DashboardTopCourseType = z.infer<typeof DashboardTopCourse>;

export type {
  DashboardOverviewType,
  DashboardPaymentType,
  DashboardSubscriptionType,
  DashboardTopCourseType,
};
