import { useTranslations } from "next-intl";

import DetailRequest from "@/app/(mentor)/mentor/requests/[id]/components/detail-request";
import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";

const DetailSubscriptionPage = ({
  params: { id },
}: {
  params: {
    id: number;
  };
}) => {
  const tSubscriptionStatus = useTranslations("subscriptionStatus");

  const tPaymentStatus = useTranslations("paymentStatus");

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Chi tiết đăng ký khóa học
        </h1>

        <BackButton />
      </div>

      <Separator className="my-5" />

      <DetailRequest
        subscriptionId={id}
        tSubscriptionStatus={tSubscriptionStatus}
        tPaymentStatus={tPaymentStatus}
      />
    </main>
  );
};
export default DetailSubscriptionPage;
