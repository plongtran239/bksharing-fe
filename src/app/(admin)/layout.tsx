import AdminSidebar from "@/components/admin-sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex justify-center">
      <AdminSidebar />
      <div className="w-full px-10 py-5">{children}</div>
    </main>
  );
};
export default AdminLayout;
