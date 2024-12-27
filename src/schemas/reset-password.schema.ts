import { z } from "zod";

const ResetPasswordRequest = z
  .object({
    newPassword: z.string().min(8).max(256),
    confirmPassword: z.string().min(8).max(256),
  })
  .strict()
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type ResetPasswordRequestType = z.infer<typeof ResetPasswordRequest>;

export { ResetPasswordRequest, type ResetPasswordRequestType };
