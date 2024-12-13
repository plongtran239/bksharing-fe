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

  const [pending, incoming, active, canceled, ended, rejected] = Object.values(
    SUBSCRIPTION_STATUS
  ).map((status) => data.filter((item) => item.status === status));

  return (
    <div className="flex-center mt-5">
      <Tabs defaultValue="incoming">
        <TabsList className="">
          <TabsTrigger value="pending">
            Chờ xác nhận ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="incoming">
            Sắp tới ({incoming.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Đang diễn ra ({active.length})
          </TabsTrigger>
          <TabsTrigger value="ended">Đã kết thúc ({ended.length})</TabsTrigger>
          <TabsTrigger value="canceled">Đã hủy ({canceled.length})</TabsTrigger>
          <TabsTrigger value="rejected">
            Bị từ chối ({rejected.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-5">
          <TabsContent value="pending">
            <Subscription data={pending} />
          </TabsContent>

          <TabsContent value="incoming">
            <Subscription data={incoming} />
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

          <TabsContent value="rejected">
            <Subscription data={rejected} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
export default SubscriptionTabs;
