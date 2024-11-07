import { Metadata } from "next";

import AppBreadCrumb from "@/components/app-breadcrumb";
import AppSidebar from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Admin | BK Sharing",
  description: "Admin page for BK Sharing",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
export default AdminLayout;
