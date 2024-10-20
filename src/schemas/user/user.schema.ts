import { z } from "zod";

import {
  ACHIEVEMENT_TYPES,
  GENDERS,
  MENTOR_STATUS,
  ROLES,
} from "@/constants/enum";

const User = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string().nullable(),
  accountType: z.nativeEnum(ROLES),
});

const Mentor = User.extend({
  accountId: z.number(),
  email: z.string().email(),
  bio: z.string(),
  dob: z.string(),
  gender: z.nativeEnum(GENDERS),
  phoneNumber: z.string(),
  registeredAt: z.string(),
  status: z.nativeEnum(MENTOR_STATUS),
  cv: z.object({
    url: z.string(),
  }),
});

const MentorDetail = Mentor.extend({
  achievements: z.array(
    z
      .object({
        type: z.nativeEnum(ACHIEVEMENT_TYPES),
        organization: z.string(),
        description: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      })
      .extend({
        position: z.string().trim().optional(), // only for EXPERIENCE
        major: z.string().trim().optional(), // only for EDUCATION
        name: z.string().trim().optional(), // only for CERTIFICATION
      })
  ),
});

const MentorResponse = z.object({
  data: MentorDetail,
  message: z.string(),
});

const MentorsResponse = z.object({
  data: z.array(Mentor),
  total: z.number(),
});

type UserType = z.infer<typeof User>;

type MentorType = z.infer<typeof Mentor>;

type MentorDetailType = z.infer<typeof MentorDetail>;

type MentorResponseType = z.infer<typeof MentorResponse>;

type MentorsResponseType = z.infer<typeof MentorsResponse>;

export {
  User,
  type UserType,
  Mentor,
  type MentorType,
  MentorDetail,
  type MentorDetailType,
  MentorResponse,
  type MentorResponseType,
  MentorsResponse,
  type MentorsResponseType,
};
