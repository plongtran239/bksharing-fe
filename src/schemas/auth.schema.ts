import { z } from "zod";

export const RegisterBody = z
  .object({
    username: z.string().trim().min(6).max(256),
    email: z.string().email(),
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

export type RegisterBodyType = z.infer<typeof RegisterBody>;

export const LoginBody = z
  .object({
    username: z.string().trim().min(6).max(256),
    password: z.string().min(8).max(256),
  })
  .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;
