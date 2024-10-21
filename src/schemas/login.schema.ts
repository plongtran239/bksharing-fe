import { z } from "zod";

const LoginRequest = z
  .object({
    email: z.string().trim().min(6).max(256),
    password: z.string().min(8).max(256),
  })
  .strict();

type LoginRequestType = z.infer<typeof LoginRequest>;

export { LoginRequest, type LoginRequestType };
