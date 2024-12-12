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
  canceledAt: z.string().nullable(),
  approvedAt: z.string().nullable(),
  rejectedAt: z.string().nullable(),
});

type SubscriptionType = z.infer<typeof Subscription>;

export { Subscription };

export type { SubscriptionType };
