import AdminSidebar from "@/components/admin-sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <AdminSidebar />
      <div className="">{children}</div>
    </main>
  );
};
export default AdminLayout;
