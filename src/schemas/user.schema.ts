import { z } from "zod";

import { MIN_DATE } from "@/constants/date";
import { GENDERS, MENTOR_STATUS, ROLES } from "@/constants/enum";
import { Achievement } from "@/schemas";

const User = z.object({
  id: z.number(),
  name: z.string(),
  accountType: z.nativeEnum(ROLES),
  accessToken: z.string(),
  avatar: z
    .object({
      fileId: z.number(),
      fileSize: z.number(),
      originalUrl: z.string(),
      versions: z.array(z.string()),
    })
    .nullable(),
});

const Account = z.object({
  email: z.string().email(),
  name: z.string().min(6).max(256),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/)
    .trim(),
  gender: z.nativeEnum(GENDERS),
  dob: z
    .date()
    .min(new Date(MIN_DATE), {
      message: `Date of birth must be greater than ${MIN_DATE}`,
    })
    .max(new Date(), {
      message: "Date of birth must be less than current date",
    }),
  bio: z.string().optional(),
  addressBase: z.string().optional(),
  addressDetail: z.string().optional(),
  avatarId: z.number().optional(),
  thumbnail: z
    .object({
      fileId: z.number(),
      fileSize: z.number(),
      originalUrl: z.string(),
      versions: z.array(z.string()),
    })
    .optional(),
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
  thumbnail: z
    .object({
      fileId: z.number(),
      fileSize: z.number(),
      originalUrl: z.string(),
      versions: z.array(z.string()),
    })
    .optional(),
  noOfSubscriptions: z.number(),
  rateOfMentor: z.number(),
});

type UserType = z.infer<typeof User>;

type AccountType = z.infer<typeof Account>;

type MentorType = z.infer<typeof Mentor>;

export { User, Account, Mentor };

export type { UserType, AccountType, MentorType };
