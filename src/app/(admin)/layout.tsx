import AdminSidebar from "@/components/admin-sidebar";
import StreamClientProvider from "@/providers/stream-client.provider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex justify-center">
      <AdminSidebar />
      <div className="w-full px-10 py-5">
        <StreamClientProvider>{children}</StreamClientProvider>
      </div>
    </main>
  );
};
export default AdminLayout;
