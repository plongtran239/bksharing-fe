import { z } from "zod";

import { ROLES } from "@/constants/enum";

const User = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string().nullable(),
  accountType: z.nativeEnum(ROLES),
});

const Mentor = User.extend({
  accountId: z.number(),
  phoneNumber: z.string(),
  registeredAt: z.string(),
  status: z.string(),
});

const MentorListResponse = z.object({
  data: z.array(Mentor),
  total: z.number(),
});

type UserType = z.infer<typeof User>;

type MentorType = z.infer<typeof Mentor>;

type MentorListResponseType = z.infer<typeof MentorListResponse>;

export {
  User,
  type UserType,
  Mentor,
  type MentorType,
  MentorListResponse,
  type MentorListResponseType,
};
