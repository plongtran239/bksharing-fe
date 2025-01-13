import { useTranslations } from "next-intl";

import Report from "@/app/(admin)/admin/reports/[id]/components/report";
import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";

const DetailReportPage = ({ params: { id } }: { params: { id: number } }) => {
  const tSubscriptionStatus = useTranslations("subscriptionStatus");
  const tPaymentStatus = useTranslations("paymentStatus");
  const tReport = useTranslations("report");

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Chi tiết báo cáo
        </h1>

        <BackButton />
      </div>

      <Separator className="my-5" />

      <Report
        reportId={id}
        tSubscriptionStatus={tSubscriptionStatus}
        tPaymentStatus={tPaymentStatus}
        tReport={tReport}
      />
    </main>
  );
};
export default DetailReportPage;
