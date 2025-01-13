import { Formats, TranslationValues } from "next-intl";

import reportApi from "@/apis/report.api";
import DetailReport from "@/app/(admin)/admin/reports/[id]/components/detail-report";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

export type TranslationsType = {
  <TargetKey>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats
  ): string;
};

interface ReportProps {
  reportId: number;
  tSubscriptionStatus: TranslationsType;
  tPaymentStatus: TranslationsType;
  tReport: TranslationsType;
}

const Report = async ({
  reportId,
  tPaymentStatus,
  tSubscriptionStatus,
  tReport,
}: ReportProps) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await reportApi.getDetailReport(reportId, sessionToken);

  if (!data) {
    return <div>Report not found</div>;
  }

  return (
    <DetailReport
      data={data}
      tPaymentStatus={tPaymentStatus}
      tSubscriptionStatus={tSubscriptionStatus}
      tReport={tReport}
    />
  );
};
export default Report;
