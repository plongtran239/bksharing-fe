import { z } from "zod";

import { ROLES } from "@/constants/enum";

const LoginRequest = z
  .object({
    email: z.string().trim().min(6).max(256),
    password: z.string().min(8).max(256),
  })
  .strict();

const LoginResponse = z.object({
  data: z.object({
    name: z.string(),
    accessToken: z.string(),
    avatar: z.string().nullable(),
    accountType: z.nativeEnum(ROLES),
  }),
  message: z.string(),
});

type LoginRequestType = z.infer<typeof LoginRequest>;

type LoginResponseType = z.infer<typeof LoginResponse>;

export {
  LoginRequest,
  LoginResponse,
  type LoginRequestType,
  type LoginResponseType,
};
