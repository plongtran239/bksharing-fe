import { z } from "zod";

import { ROLES } from "@/constants/enum";

const User = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string().nullable(),
  accountType: z.nativeEnum(ROLES),
});

type UserType = z.infer<typeof User>;

export { User, type UserType };
