import { REPORT_STATUS, REPORT_TYPE } from "@/constants/enum";
import http from "@/lib/http";
import { ListResponseType } from "@/schemas";
import { ReportRequestType, ReportType } from "@/schemas/report.schema";

const reportApi = {
  createReport: (body: ReportRequestType) => http.post("/reports", body),

  resolveReport: (
    reportId: number,
    body: {
      status: REPORT_STATUS;
      resolution: string;
    }
  ) => http.put(`/reports/${reportId}/resolve`, body),

  getReports: (params: {
    pageSize?: number;
    pageNumber?: number;
    status?: REPORT_STATUS;
    type?: REPORT_TYPE;
  }) => {
    const { pageSize = 10, pageNumber = 1, status, type } = params;

    let paramsString = `pageSize=${pageSize}&pageNumber=${pageNumber}`;

    if (status) {
      paramsString += `&status=${status}`;
    }

    if (type) {
      paramsString += `&type=${type}`;
    }

    return http.get<ListResponseType<ReportType>>(`/reports?${paramsString}`);
  },
};

export default reportApi;
