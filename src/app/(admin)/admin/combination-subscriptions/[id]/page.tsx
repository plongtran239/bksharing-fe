import { useTranslations } from "next-intl";

import DetailSubscription from "@/app/(admin)/admin/combination-subscriptions/[id]/components/detail-subscription";
import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";

const DetailAdminSubscriptionPage = ({
  params: { id },
}: {
  params: {
    id: number;
  };
}) => {
  const tSubscriptionStatus = useTranslations("subscriptionStatus");

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Chi tiết đăng ký khóa học
        </h1>

        <BackButton />
      </div>

      <Separator className="my-5" />

      <DetailSubscription
        subscriptionId={id}
        tSubscriptionStatus={tSubscriptionStatus}
      />
    </main>
  );
};
export default DetailAdminSubscriptionPage;
