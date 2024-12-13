import { z } from "zod";

import { SUBSCRIPTION_STATUS } from "@/constants/enum";

const Subscription = z.object({
  id: z.number(),
  status: z.nativeEnum(SUBSCRIPTION_STATUS),
  originalPrice: z.string(),
  courseStartAt: z.string(),
  courseEndAt: z.string(),
  course: z.object({
    id: z.number(),
    name: z.string(),
  }),
  studentInfo: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
  }),
  canceledAt: z.string().nullable(),
  approvedAt: z.string().nullable(),
  rejectedAt: z.string().nullable(),
});

const SubscriptionDetail = z.object({
  id: z.number(),
  status: z.nativeEnum(SUBSCRIPTION_STATUS),
  orginalPrice: z.string(),
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
    thumbnail: z.object({
      fileId: z.number(),
      fileName: z.string(),
      fileSize: z.number(),
      originalUrl: z.string(),
      versions: z.array(z.unknown()),
    }),
  }),
  student: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }),
});

type SubscriptionType = z.infer<typeof Subscription>;

type SubscriptionDetailType = z.infer<typeof SubscriptionDetail>;

export { Subscription, SubscriptionDetail };

export type { SubscriptionType, SubscriptionDetailType };
