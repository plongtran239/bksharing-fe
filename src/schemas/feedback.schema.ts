import { z } from "zod";

import { REVIEW_TYPE } from "@/constants/enum";

const CreateFeedback = z.object({
  content: z.string(),
  rating: z.number().int().min(1).max(5),
  reviewType: z.nativeEnum(REVIEW_TYPE),
  mentorId: z.number().optional(),
  courseId: z.number().optional(),
});

const UpdateFeedback = z.object({
  content: z.string(),
  rating: z.number().int().min(1).max(5),
});

const Feedback = z.object({
  id: z.number(),
  reviewer: z.object({
    id: z.number(),
    name: z.string(),
    thumbnail: z
      .object({
        originalUrl: z.string(),
      })
      .nullable(),
  }),
  reviewType: z.nativeEnum(REVIEW_TYPE),
  courseId: z.number().nullable(),
  mentorId: z.number().nullable(),
  rating: z.number().int().min(1).max(5),
  content: z.string(),
  updatedAt: z.string(),
});

type CreateFeedbackType = z.infer<typeof CreateFeedback>;

type UpdateFeedbackType = z.infer<typeof UpdateFeedback>;

type FeedbackType = z.infer<typeof Feedback>;

export type { CreateFeedbackType, UpdateFeedbackType, FeedbackType };
