import Overview from "@/app/(mentor)/mentor/dashboard/components/overview";
import Payments from "@/app/(mentor)/mentor/dashboard/components/payments";
import SubscriptionTable from "@/app/(mentor)/mentor/dashboard/components/subscription-table";

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <Overview />

      <Payments />

      <SubscriptionTable />
    </div>
  );
};
export default Dashboard;
