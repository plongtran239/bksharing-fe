import { z } from "zod";

import { MIN_DATE } from "@/constants/date";
import { ACHIEVEMENT_TYPES, GENDERS, ROLES } from "@/constants/enum";

const LoginBody = z
  .object({
    email: z.string().trim().min(6).max(256),
    password: z.string().min(8).max(256),
  })
  .strict();

type LoginBodyType = z.infer<typeof LoginBody>;

const LoginRes = z.object({
  data: z.object({
    name: z.string(),
    accessToken: z.string(),
    avatar: z.string().nullable(),
    accountType: z.nativeEnum(ROLES),
  }),
  message: z.string(),
});

type LoginResType = z.infer<typeof LoginRes>;

const RegisterBody = LoginBody.extend({
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters",
    })
    .max(10, {
      message: "Phone number must be at most 10 characters",
    }),
  name: z
    .string()
    .trim()
    .min(6, {
      message: "Name must be at least 6 characters",
    })
    .max(256, {
      message: "Name must be at most 256 characters",
    }),

  confirmPassword: z.string().min(8).max(256),
  dob: z
    .date()
    .min(new Date(MIN_DATE), {
      message: `Date of birth must be greater than ${MIN_DATE}`,
    })
    .max(new Date(), {
      message: "Date of birth must be less than current date",
    }),
  gender: z.nativeEnum(GENDERS),
})
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterBodyType = z.infer<typeof RegisterBody>;

const RegisterRes = LoginRes;

type RegisterResType = z.infer<typeof RegisterRes>;

const ChangePasswordBody = z
  .object({
    oldPassword: z.string().min(8).max(256),
    newPassword: z.string().min(8).max(256),
    confirmPassword: z.string().min(8).max(256),
  })
  .strict()
  .superRefine(({ oldPassword, newPassword, confirmPassword }, ctx) => {
    if (oldPassword === newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be different from old password",
        path: ["newPassword"],
      });
    }

    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type ChangePasswordBodyType = z.infer<typeof ChangePasswordBody>;

const AchievementSchema = z
  .object({
    achievementType: z.nativeEnum(ACHIEVEMENT_TYPES),
    organization: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  })
  .extend({
    position: z.string().optional(), // only for EXPERIENCE
    major: z.string().optional(), // only for EDUCATION
    name: z.string().optional(), // only for CERTIFICATION
  })
  .refine(
    (data) => {
      switch (data.achievementType) {
        case ACHIEVEMENT_TYPES.EXPERIENCE:
          return !!data.position;
        case ACHIEVEMENT_TYPES.EDUCATION:
          return !!data.major;
        case ACHIEVEMENT_TYPES.CERTIFICATION:
          return !!data.name;
      }
    },
    {
      message: "Required field missing based on achievement type",
    }
  )
  .superRefine(
    ({ startDate, endDate, achievementType, position, major, name }, ctx) => {
      if (startDate >= endDate) {
        ctx.addIssue({
          code: "custom",
          message: "End date must be greater than start date",
          path: ["endDate"],
        });
      }

      switch (achievementType) {
        case ACHIEVEMENT_TYPES.EXPERIENCE:
          if (position === "") {
            ctx.addIssue({
              code: "custom",
              message: "Position is required",
              path: ["position"],
            });
          }
          break;
        case ACHIEVEMENT_TYPES.EDUCATION:
          if (major === "") {
            ctx.addIssue({
              code: "custom",
              message: "Major is required",
              path: ["major"],
            });
          }
          break;
        case ACHIEVEMENT_TYPES.CERTIFICATION:
          if (name === "") {
            ctx.addIssue({
              code: "custom",
              message: "Name is required",
              path: ["name"],
            });
          }
          break;
      }
    }
  );

const MentorRegisterBody = RegisterBody.and(
  z.object({
    achievements: z.array(AchievementSchema),
  })
);

type MentorRegisterBodyType = z.infer<typeof MentorRegisterBody>;

export {
  RegisterBody,
  type RegisterBodyType,
  LoginBody,
  type LoginBodyType,
  LoginRes,
  type LoginResType,
  RegisterRes,
  type RegisterResType,
  ChangePasswordBody,
  type ChangePasswordBodyType,
  MentorRegisterBody,
  type MentorRegisterBodyType,
};
