import { z } from "zod";

import { MIN_DATE } from "@/constants/date";
import { ACHIEVEMENT_TYPES, EDUCATION_LEVELS, GENDERS } from "@/constants/enum";
import { LoginRequest, LoginResponse } from "@/schemas/auth";

const RegisterRequest = LoginRequest.extend({
  email: z.string().email(),
  phoneNumber: z
    .string()
    .trim()
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
  confirmPassword: z.string().trim().min(8).max(256),
  dob: z
    .date()
    .min(new Date(MIN_DATE), {
      message: `Date of birth must be greater than ${MIN_DATE}`,
    })
    .max(new Date(), {
      message: "Date of birth must be less than current date",
    }),
  gender: z.nativeEnum(GENDERS),
}).strict();

const AchivementRequest = z
  .object({
    achievementType: z.nativeEnum(ACHIEVEMENT_TYPES),
    organization: z
      .string()
      .trim()
      .min(1, {
        message: "Organization must be at least 1 character",
      })
      .max(256, {
        message: "Organization must be at most 256 characters",
      }),
    description: z.string().trim(),
    startDate: z
      .date()
      .min(new Date(MIN_DATE), {
        message: `Start date must be greater than ${MIN_DATE}`,
      })
      .max(new Date(), {
        message: "Start date must be less than current date",
      }),
    endDate: z
      .date()
      .min(new Date(MIN_DATE), {
        message: `Start date must be greater than ${MIN_DATE}`,
      })
      .max(new Date(), {
        message: "Start date must be less than current date",
      }),
  })
  .extend({
    position: z.string().trim().optional(), // only for EXPERIENCE
    major: z.string().trim().optional(), // only for EDUCATION
    name: z.string().trim().optional(), // only for CERTIFICATION
  })
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
          if (!position) {
            ctx.addIssue({
              code: "custom",
              message: "Position is required",
              path: ["position"],
            });
          }
          break;
        case ACHIEVEMENT_TYPES.EDUCATION:
          if (!major) {
            ctx.addIssue({
              code: "custom",
              message: "Major is required",
              path: ["major"],
            });
          }
          break;
        case ACHIEVEMENT_TYPES.CERTIFICATION:
          if (!name) {
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

const AchievementResponse = z
  .object({
    type: z.nativeEnum(ACHIEVEMENT_TYPES),
    organization: z.string().trim(),
    description: z.string().trim(),
    startDate: z.string(),
    endDate: z.string(),
  })
  .extend({
    position: z.string().trim().optional(), // only for EXPERIENCE
    major: z.string().trim().optional(), // only for EDUCATION
    name: z.string().trim().optional(), // only for CERTIFICATION
  });

const StudentRegisterRequest = RegisterRequest.extend({
  addressBase: z.string().trim().optional(),
  addressDetail: z.string().trim().optional(),
  major: z.string().trim().optional(),
  educationalLevel: z.nativeEnum(EDUCATION_LEVELS).optional(),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

const MentorRegisterRequest = RegisterRequest.extend({
  achievements: z.array(AchivementRequest).nonempty(),
  fileId: z.number().optional(),
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

const RegisterResponse = LoginResponse;

type RegisterRequestType = z.infer<typeof RegisterRequest>;

type StudentRegisterRequestType = z.infer<typeof StudentRegisterRequest>;

type AchivementRequestType = z.infer<typeof AchivementRequest>;

type AchivementResponseType = z.infer<typeof AchievementResponse>;

type MentorRegisterRequestType = z.infer<typeof MentorRegisterRequest>;

type RegisterResponseType = z.infer<typeof RegisterResponse>;

export {
  StudentRegisterRequest,
  MentorRegisterRequest,
  RegisterResponse,
  AchivementRequest,
  type RegisterRequestType,
  type AchivementRequestType,
  type AchivementResponseType,
  type StudentRegisterRequestType,
  type MentorRegisterRequestType,
  type RegisterResponseType,
};
