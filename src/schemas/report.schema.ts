import { z } from "zod";

import { REPORT_STATUS, REPORT_TYPE } from "@/constants/enum";

const ReportRequest = z.object({
  subscriptionId: z.number(),
  type: z.nativeEnum(REPORT_TYPE),
  description: z.string(),
});

const Report = z.object({
  id: z.number(),
  type: z.nativeEnum(REPORT_TYPE),
  description: z.string(),
  status: z.nativeEnum(REPORT_STATUS),
  reporter: z.object({
    id: z.number(),
    name: z.string(),
  }),
  createdAt: z.string(),
});

type ReportRequestType = z.infer<typeof ReportRequest>;

type ReportType = z.infer<typeof Report>;

export { ReportRequest };

export type { ReportRequestType, ReportType };
