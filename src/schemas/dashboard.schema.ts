import { z } from "zod";

const dashboardOverview = z.object({
  totalCourses: z.number(),
  totalStudents: z.number(),
  totalMentors: z.number(),
  totalSubscriptions: z.number(),
  revenue: z.number(),
});

const DashboardPayment = z.record(
  z.string(),
  z.object({
    totalAmount: z.number(),
    noOfPayments: z.number(),
  })
);

type DashboardOverviewType = z.infer<typeof dashboardOverview>;

type DashboardPaymentType = z.infer<typeof DashboardPayment>;

export type { DashboardOverviewType, DashboardPaymentType };
