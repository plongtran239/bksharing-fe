import { z } from "zod";

const RegisterBody = z
  .object({
    email: z.string().email(),
    phoneNumber: z.string().min(10).max(10),
    name: z.string().trim().min(6).max(256),
    password: z.string().min(8).max(256),
    confirmPassword: z.string().min(8).max(256),
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

const LoginBody = z
  .object({
    email: z.string().trim().min(6).max(256),
    password: z.string().min(8).max(256),
  })
  .strict();

type LoginBodyType = z.infer<typeof LoginBody>;

const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    accountType: z.string(),
  }),
  message: z.string(),
});

type LoginResType = z.infer<typeof LoginRes>;

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
};
