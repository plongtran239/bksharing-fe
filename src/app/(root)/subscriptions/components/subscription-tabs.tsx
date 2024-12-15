import subscriptionApi from "@/apis/subscription.api";
import Subscription from "@/app/(root)/subscriptions/components/subscription";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBSCRIPTION_STATUS } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const SubscriptionTabs = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await subscriptionApi.getSubscriptions(sessionToken);

  const [pending, accepted, active, canceled, ended, expired, rejected] =
    Object.values(SUBSCRIPTION_STATUS).map((status) =>
      data.filter((item) => item.status === status)
    );

  return (
    <div className="flex-center mt-5">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger className="px-8" value="pending">
            Chờ xác nhận ({pending.length})
          </TabsTrigger>
          <TabsTrigger className="px-8" value="accepted">
            Chờ thanh toán ({accepted.length})
          </TabsTrigger>
          <TabsTrigger className="px-8" value="active">
            Đang học ({active.length})
          </TabsTrigger>
          <TabsTrigger className="px-8" value="ended">
            Đã kết thúc ({ended.length})
          </TabsTrigger>
          <TabsTrigger className="px-8" value="canceled">
            Đã hủy ({canceled.length})
          </TabsTrigger>
          <TabsTrigger className="px-8" value="expired">
            Hết hạn ({expired.length})
          </TabsTrigger>
          <TabsTrigger className="px-8" value="rejected">
            Bị từ chối ({rejected.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-5">
          <TabsContent value="pending">
            <Subscription data={pending} />
          </TabsContent>

          <TabsContent value="accepted">
            <Subscription data={accepted} />
          </TabsContent>

          <TabsContent value="active">
            <Subscription data={active} />
          </TabsContent>

          <TabsContent value="ended">
            <Subscription data={ended} />
          </TabsContent>

          <TabsContent value="canceled">
            <Subscription data={canceled} />
          </TabsContent>

          <TabsContent value="expired">
            <Subscription data={expired} />
          </TabsContent>

          <TabsContent value="rejected">
            <Subscription data={rejected} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
export default SubscriptionTabs;
