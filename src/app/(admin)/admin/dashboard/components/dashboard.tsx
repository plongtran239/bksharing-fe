"use client";

import Overview from "@/app/(admin)/admin/dashboard/components/overview";
import Payments from "@/app/(admin)/admin/dashboard/components/payments";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <Overview />

      <Payments />
    </div>
  );
};
export default Dashboard;
