import Overview from "@/app/(admin)/admin/dashboard/components/overview";
import Payments from "@/app/(admin)/admin/dashboard/components/payments";
import SubscriptionTable from "@/app/(admin)/admin/dashboard/components/subscription-table";

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
