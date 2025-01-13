import { z } from "zod";

import {
  COURSE_STATUS,
  PAYMENT_STATUS,
  REPORT_STATUS,
  REPORT_TYPE,
  SUBSCRIPTION_STATUS,
} from "@/constants/enum";

const BaseReportRequest = z.object({
  type: z.nativeEnum(REPORT_TYPE),
  description: z.string(),
});

const SubscriptionReportRequest = BaseReportRequest.extend({
  subscriptionId: z.number(),
});

const FeedbackReportRequest = BaseReportRequest.extend({
  feedbackId: z.number(),
});

const Report = z.object({
  id: z.number(),
  type: z.nativeEnum(REPORT_TYPE),
  description: z.string(),
  status: z.nativeEnum(REPORT_STATUS),
  resolution: z.string().nullable(),
  reporter: z.object({
    id: z.number(),
    name: z.string(),
  }),
  createdAt: z.string(),
});

const Course = z.object({
  id: z.number(),
  name: z.string(),
  status: z.nativeEnum(COURSE_STATUS),
  description: z.string(),
});

const Mentor = z.object({
  id: z.number(),
  name: z.string(),
  thumbnail: z
    .object({
      originalUrl: z.string(),
    })
    .nullable(),
});

const Student = z.object({
  id: z.number(),
  name: z.string(),
  thumbnail: z
    .object({
      originalUrl: z.string(),
    })
    .nullable(),
  email: z.string(),
  phoneNumber: z.string(),
  dob: z.string(),
});

const AudioCall = z.object({
  id: z.number(),
  cid: z.string(),
});

const Payment = z.object({
  price: z.number(),
  status: z.nativeEnum(PAYMENT_STATUS),
});

const SubscriptionFeedback = z.object({
  id: z.number(),
  courseRating: z.number(),
  mentorRating: z.number(),
  courseReview: z.string(),
  mentorReview: z.string(),
  updatedAt: z.string(),
});

const Subscription = z.object({
  id: z.number(),
  status: z.nativeEnum(SUBSCRIPTION_STATUS),
  courseAccessStartAt: z.string(),
  courseAccessEndAt: z.string(),
  orginalPrice: z.number(),
  course: Course,
  mentor: Mentor,
  student: Student,
  audioCall: AudioCall,
  payment: Payment,
  feedbacks: z.array(SubscriptionFeedback),
});

const Feedback = z.object({
  id: z.number(),
  courseRating: z.number(),
  mentorRating: z.number(),
  courseReview: z.string(),
  mentorReview: z.string(),
  updatedAt: z.string(),
  reviewer: z.object({
    id: z.number(),
    name: z.string(),
    thumbnail: z
      .object({
        originalUrl: z.string(),
      })
      .nullable(),
  }),
  subscriptionId: z.number(),
});

const DetailReport = z.object({
  id: z.number(),
  type: z.nativeEnum(REPORT_TYPE),
  description: z.string(),
  status: z.nativeEnum(REPORT_STATUS),
  resolution: z.string().nullable(),
  createdAt: z.string(),
  subscription: Subscription.nullable(),
  feedback: Feedback.nullable(),
});

type SubscriptionReportRequestType = z.infer<typeof SubscriptionReportRequest>;

type FeedbackReportRequestType = z.infer<typeof FeedbackReportRequest>;

type ReportType = z.infer<typeof Report>;

type DetailReportType = z.infer<typeof DetailReport>;

export { SubscriptionReportRequest, FeedbackReportRequest };

export type {
  SubscriptionReportRequestType,
  FeedbackReportRequestType,
  ReportType,
  DetailReportType,
};
