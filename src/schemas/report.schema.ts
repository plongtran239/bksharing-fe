import { z } from "zod";

import { REPORT_STATUS, REPORT_TYPE } from "@/constants/enum";

const BaseReportRequest = z.object({
  type: z.nativeEnum(REPORT_TYPE),
  description: z.string(),
});

const SubscriptionReportRequest = BaseReportRequest.extend({
  subscriptionId: z.number(),
});

const FeedbackReportRequest = BaseReportRequest.extend({
  feedbackId: z.number(),
});

const Report = z.object({
  id: z.number(),
  type: z.nativeEnum(REPORT_TYPE),
  description: z.string(),
  status: z.nativeEnum(REPORT_STATUS),
  resolution: z.string().nullable(),
  reporter: z.object({
    id: z.number(),
    name: z.string(),
  }),
  createdAt: z.string(),
});

type SubscriptionReportRequestType = z.infer<typeof SubscriptionReportRequest>;

type FeedbackReportRequestType = z.infer<typeof FeedbackReportRequest>;

type ReportType = z.infer<typeof Report>;

export { SubscriptionReportRequest, FeedbackReportRequest };

export type {
  SubscriptionReportRequestType,
  FeedbackReportRequestType,
  ReportType,
};
