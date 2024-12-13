import SubscriptionTabs from "@/app/(root)/subscriptions/components/subscription-tabs";

const now = new Date();

const time = now.toLocaleTimeString("vi-VN", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Ho_Chi_Minh",
});
const date = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "full",
  timeZone: "Asia/Ho_Chi_Minh",
}).format(now);

const SubscriptionPage = () => {
  return (
    <main className="pb-10">
      <div className="h-[200px] w-full bg-meeting-hero bg-cover text-white">
        <div className="flex h-full flex-col justify-between p-10">
          <div className="container flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-sky-1 text-lg font-medium lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <SubscriptionTabs />
    </main>
  );
};
export default SubscriptionPage;
