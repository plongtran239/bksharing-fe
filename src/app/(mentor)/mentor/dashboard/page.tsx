import { Metadata } from "next";

import Dashboard from "@/app/(mentor)/mentor/dashboard/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | BK Sharing",
  description: "Dashboard page for BK Sharing admin",
};

const DashboardPage = () => {
  return (
    <main>
      <Dashboard />
    </main>
  );
};
export default DashboardPage;
