import { REPORT_STATUS, REPORT_TYPE } from "@/constants/enum";
import http from "@/lib/http";
import { DetailResponseType, ListResponseType } from "@/schemas";
import {
  DetailReportType,
  FeedbackReportRequestType,
  ReportType,
  SubscriptionReportRequestType,
} from "@/schemas/report.schema";

const reportApi = {
  createSubscriptionReport: (body: SubscriptionReportRequestType) =>
    http.post("/reports/subscriptions", body),

  createFeedbackReport: (body: FeedbackReportRequestType) =>
    http.post("/reports/feedbacks", body),

  getReports: (
    sessionToken: string,
    params?: {
      pageSize?: number;
      pageNumber?: number;
      status?: REPORT_STATUS;
      type?: REPORT_TYPE;
    }
  ) => {
    const { pageSize = 10, pageNumber = 1, status, type } = params || {};

    let paramsString = `pageSize=${pageSize}&pageNumber=${pageNumber}`;

    if (status) {
      paramsString += `&status=${status}`;
    }

    if (type) {
      paramsString += `&type=${type}`;
    }

    return http.get<ListResponseType<ReportType>>(`/reports?${paramsString}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },

  getDetailReport: (reportId: number, sessionToken: string) =>
    http.get<DetailResponseType<DetailReportType>>(`/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  resolveSubscriptionReport: (
    reportId: number,
    body: {
      status: REPORT_STATUS;
      resolution: string;
    }
  ) => http.patch(`/reports/${reportId}/subscription-resolutions`, body),

  resolveFeedbackReport: (
    reportId: number,
    body: {
      status: REPORT_STATUS;
      resolution: string;
    }
  ) => http.patch(`/reports/${reportId}/feedback-resolutions`, body),
};

export default reportApi;
