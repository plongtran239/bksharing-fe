import Clock from "@/app/(root)/subscriptions/components/clock";
import SubscriptionTabs from "@/app/(root)/subscriptions/components/subscription-tabs";

const SubscriptionPage = () => {
  return (
    <main className="pb-10">
      <div className="h-[200px] w-full bg-meeting-hero bg-cover text-white">
        <div className="flex h-full flex-col justify-between p-10">
          <Clock />
        </div>
      </div>

      <SubscriptionTabs />
    </main>
  );
};
export default SubscriptionPage;
