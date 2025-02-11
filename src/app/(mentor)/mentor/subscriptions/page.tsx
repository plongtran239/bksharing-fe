import subscriptionApi from "@/apis/subscription.api";
import SubscriptionTable from "@/app/(mentor)/mentor/subscriptions/components/subscription-table";
import { Separator } from "@/components/ui/separator";
import { SUBSCRIPTION_STATUS } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const SubScriptionMentorPage = async ({
  searchParams: { status },
}: {
  searchParams: {
    status: SUBSCRIPTION_STATUS;
  };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await subscriptionApi.getCombinationSubscriptions(sessionToken, status);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Danh sách học</h1>
      </div>

      <Separator className="my-5" />

      <SubscriptionTable data={data} />
    </main>
  );
};
export default SubScriptionMentorPage;
