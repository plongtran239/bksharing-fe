import subscriptionApi from "@/apis/subscription.api";
import SubscriptionTable from "@/app/(admin)/admin/subscriptions/components/subscription-table";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const Subscriptions = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await subscriptionApi.getAdminSubscriptions(sessionToken);

  return <SubscriptionTable data={data} />;
};
export default Subscriptions;
