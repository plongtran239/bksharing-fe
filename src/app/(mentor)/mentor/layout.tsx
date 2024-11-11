import { Metadata } from "next";
import { PropsWithChildren } from "react";

import AppBreadCrumb from "@/components/app-breadcrumb";
import AppSidebar from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Mentor | BK Sharing",
  description: "Mentor page for BK Sharing",
};

const MentorLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-10 py-5">
        <div className="mb-5 flex items-center gap-2">
          <SidebarTrigger />

          <Separator orientation="vertical" className="h-4" />

          <AppBreadCrumb />
        </div>

        {children}
      </main>
    </SidebarProvider>
  );
};

export default MentorLayout;
