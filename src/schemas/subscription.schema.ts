import { z } from "zod";

import { MEETING_STATUS, SUBSCRIPTION_STATUS } from "@/constants/enum";

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
  }),
  audiCall: z.object({
    status: z.nativeEnum(MEETING_STATUS),
    cid: z.string(),
  }),
});

type SubscriptionType = z.infer<typeof Subscription>;

type SubscriptionDetailType = z.infer<typeof SubscriptionDetail>;

export { Subscription, SubscriptionDetail };

export type { SubscriptionType, SubscriptionDetailType };
