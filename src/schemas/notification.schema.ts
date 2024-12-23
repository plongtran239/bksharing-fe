import { z } from "zod";

import {
  NOTIFICATION_RELATION_TYPE,
  NOTIFICATION_TYPE,
} from "@/constants/enum";

const Course = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  startDate: z.string(), // miliseconds
  endDate: z.string(), // miliseconds
});

const Payment = z.object({
  id: z.number(),
});

const Subscription = z.object({
  id: z.number(),
  course: Course,
  payment: z
    .object({
      id: z.number(),
    })
    .nullable(),
  createdAt: z.string(),
});

const Mentor = z.object({
  id: z.number(),
});

const AudioRoom = z.object({
  id: z.number(),
});

const Notification = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  isRead: z.boolean(),
  type: z.nativeEnum(NOTIFICATION_TYPE),
  relationType: z.nativeEnum(NOTIFICATION_RELATION_TYPE),
  readAt: z.string().nullable(),
  createdAt: z.string(),
  course: Course.nullable(),
  payment: Payment.nullable(),
  subscription: Subscription.nullable(),
  mentor: Mentor.nullable(),
  audioRoom: AudioRoom.nullable(),
});

type NotificationType = z.infer<typeof Notification>;

export { Notification };

export type { NotificationType };
