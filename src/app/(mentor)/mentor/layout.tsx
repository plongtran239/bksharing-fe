import { Metadata } from "next";

import Sidebar from "@/components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Mentor | BK Sharing",
  description: "Mentor page for BK Sharing",
};

const MentorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex justify-center">
      <Sidebar />
      <div className="w-full px-10 py-5">{children}</div>
    </main>
  );
};

export default MentorLayout;
