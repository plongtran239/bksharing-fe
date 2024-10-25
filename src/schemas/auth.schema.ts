import { z } from "zod";

import { ROLES } from "@/constants/enum";
import { DetailResponseType } from "@/schemas";

const AuthResponse = z.object({
  id: z.number(),
  name: z.string(),
  accessToken: z.string(),
  avatar: z
    .object({
      fileId: z.number(),
      fileSize: z.number(),
      originalUrl: z.string(),
      versions: z.array(z.string()),
    })
    .nullable(),
  accountType: z.nativeEnum(ROLES),
});

type AuthResponseType = DetailResponseType<z.infer<typeof AuthResponse>>;

export { AuthResponse, type AuthResponseType };
