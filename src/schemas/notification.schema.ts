import { z } from "zod";

const Notification = z.object({
  id: z.number(),
});

type NotificationType = z.infer<typeof Notification>;

export { Notification };

export type { NotificationType };
