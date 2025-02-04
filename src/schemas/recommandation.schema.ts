import { z } from "zod";

const MentorRecommandation = z.object({
  account_id: z.number(),
  account_name: z.string(),
  similarity: z.number(),
});

const MentorRecommandationList = z.object({
  recommendations: z.array(MentorRecommandation),
});

const MentorDTO = z.object({
  id: z.number(),
  accountId: z.number(),
  name: z.string(),
  bio: z.string(),
  thumbnail: z
    .object({
      originalUrl: z.string().nullable(),
    })
    .nullable(),
  noOfSubscriptions: z.number(),
  rateOfMentor: z.number(),
});

const MentorsDTO = z.object({
  mentorsDTO: z.array(MentorDTO),
});

type MentorRecommandationListType = z.infer<typeof MentorRecommandationList>;

type MentorDTOType = z.infer<typeof MentorDTO>;

type MentorsDTOType = z.infer<typeof MentorsDTO>;

export type { MentorRecommandationListType, MentorDTOType, MentorsDTOType };
