import { z } from "zod";

import { MIN_DATE } from "@/constants/date";
import { EDUCATION_LEVELS, GENDERS } from "@/constants/enum";
import { AchivementRequest, LoginRequest } from "@/schemas";

const RegisterRequest = LoginRequest.extend({
  email: z.string().email(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/)
    .trim(),
  name: z
    .string()
    .trim()
    .min(6, {
      message: "at least 6 characters",
    })
    .max(256, {
      message: "at most 256 characters",
    }),
  confirmPassword: z.string().trim().min(8).max(256),
  dob: z
    .date()
    .min(new Date(MIN_DATE), {
      message: `must be greater than ${MIN_DATE}`,
    })
    .max(new Date(), {
      message: "must be less than current date",
    }),
  gender: z.nativeEnum(GENDERS),
}).strict();

const StudentRegisterRequest = RegisterRequest.extend({
  major: z.string().trim(),
  educationLevel: z.nativeEnum(EDUCATION_LEVELS),
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

type RegisterRequestType = z.infer<typeof RegisterRequest>;

type StudentRegisterRequestType = z.infer<typeof StudentRegisterRequest>;

type MentorRegisterRequestType = z.infer<typeof MentorRegisterRequest>;

export {
  StudentRegisterRequest,
  MentorRegisterRequest,
  type RegisterRequestType,
  type StudentRegisterRequestType,
  type MentorRegisterRequestType,
};
