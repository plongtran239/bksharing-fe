import { z } from "zod";

const CreateFeedback = z.object({
  mentorRating: z.number().int().min(1).max(5),
  courseRating: z.number().int().min(1).max(5),
  mentorReview: z.string(),
  courseReview: z.string(),
  subscriptionId: z.number(),
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
  courseRating: z.number(),
  mentorRating: z.number(),
  courseReview: z.string(),
  mentorReview: z.string(),
  subscriptionId: z.number(),
  updatedAt: z.string(),
});

type CreateFeedbackType = z.infer<typeof CreateFeedback>;

type UpdateFeedbackType = z.infer<typeof UpdateFeedback>;

type FeedbackType = z.infer<typeof Feedback>;

export type { CreateFeedbackType, UpdateFeedbackType, FeedbackType };
