import { z } from "zod";

const ChangePasswordRequest = z
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

type ChangePasswordRequestType = z.infer<typeof ChangePasswordRequest>;

export { ChangePasswordRequest, type ChangePasswordRequestType };
