import { z } from "zod";

import { GENDERS, MENTOR_STATUS, ROLES } from "@/constants/enum";
import { Achievement } from "@/schemas";

const User = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string().nullable(),
  accountType: z.nativeEnum(ROLES),
});

const Account = z.object({
  email: z.string().email(),
  name: z.string(),
  phoneNumber: z.string(),
  gender: z.nativeEnum(GENDERS),
  dob: z.date(),
  addressBase: z.string().optional(),
  addressDetail: z.string().optional(),
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
  achievements: z.array(Achievement),
});

type UserType = z.infer<typeof User>;

type AccountType = z.infer<typeof Account>;

type MentorType = z.infer<typeof Mentor>;

export { User, Account, Mentor };

export type { UserType, AccountType, MentorType };
