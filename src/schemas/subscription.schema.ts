import { z } from "zod";

import {
  MEETING_STATUS,
  PAYMENT_STATUS,
  REPORT_STATUS,
  REPORT_TYPE,
  SUBSCRIPTION_STATUS,
} from "@/constants/enum";

const Subscription = z.object({
  id: z.number(),
  status: z.nativeEnum(SUBSCRIPTION_STATUS),
  originalPrice: z.number(),
  courseStartAt: z.string(),
  courseEndAt: z.string(),
  course: z.object({
    id: z.number(),
    name: z.string(),
  }),
  mentorInfo: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    thumbnail: z
      .object({
        originalUrl: z.string(),
      })
      .nullable(),
  }),
  studentInfo: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    thumbnail: z.object({
      originalUrl: z.string(),
    }),
  }),
  audiCall: z
    .object({
      status: z.nativeEnum(MEETING_STATUS),
      cid: z.string(),
    })
    .nullable(),
  payment: z
    .object({
      status: z.nativeEnum(PAYMENT_STATUS),
      price: z.number(),
    })
    .nullable(),
  feedback: z
    .object({
      id: z.number(),
      courseRating: z.number(),
      courseReview: z.string(),
      mentorRating: z.number(),
      mentorReview: z.string(),
    })
    .nullable(),
  report: z
    .object({
      id: z.number(),
      type: z.nativeEnum(REPORT_TYPE),
      description: z.string(),
      status: z.nativeEnum(REPORT_STATUS),
      resolution: z.string(),
    })
    .nullable(),
  canceledAt: z.string().nullable(),
  approvedAt: z.string().nullable(),
  rejectedAt: z.string().nullable(),
});

const SubscriptionDetail = z.object({
  id: z.number(),
  status: z.nativeEnum(SUBSCRIPTION_STATUS),
  orginalPrice: z.number(),
  message: z.string(),
  courseAccessStartAt: z.string(),
  courseAccessEndAt: z.string(),
  course: z.object({
    id: z.number(),
    name: z.string(),
    status: z.nativeEnum(SUBSCRIPTION_STATUS),
    description: z.string(),
  }),
  mentor: z.object({
    id: z.number(),
    name: z.string(),
    thumbnail: z
      .object({
        fileId: z.number(),
        fileName: z.string(),
        fileSize: z.number(),
        originalUrl: z.string(),
        versions: z.array(z.unknown()),
      })
      .nullable(),
  }),
  student: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    thumbnail: z
      .object({
        fileId: z.number(),
        fileName: z.string(),
        fileSize: z.number(),
        originalUrl: z.string(),
        versions: z.array(z.unknown()),
      })
      .nullable(),
    dob: z.string(),
  }),
  payment: z.object({
    status: z.nativeEnum(PAYMENT_STATUS),
    price: z.number(),
  }),
  audiCall: z.object({
    status: z.nativeEnum(MEETING_STATUS),
    cid: z.string(),
  }),
});

const MentorSubscription = z.object({
  id: z.number(),
  status: z.nativeEnum(SUBSCRIPTION_STATUS),
  courseAccessStartAt: z.string(),
  courseAccessEndAt: z.string(),
});

type SubscriptionType = z.infer<typeof Subscription>;

type SubscriptionDetailType = z.infer<typeof SubscriptionDetail>;

type MentorSubscriptionType = z.infer<typeof MentorSubscription>;

export { Subscription, SubscriptionDetail };

export type {
  SubscriptionType,
  SubscriptionDetailType,
  MentorSubscriptionType,
};
