import Overview from "@/app/(mentor)/mentor/dashboard/components/overview";
import Payments from "@/app/(mentor)/mentor/dashboard/components/payments";
import SubscriptionTable from "@/app/(mentor)/mentor/dashboard/components/subscription-table";

// import TopCourse from "@/app/(mentor)/mentor/dashboard/components/top-course";

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <Overview />

      <Payments />

      <SubscriptionTable />

      {/* <TopCourse /> */}
    </div>
  );
};
export default Dashboard;
