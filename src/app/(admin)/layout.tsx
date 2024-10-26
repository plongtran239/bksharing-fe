import { Metadata } from "next";

import userApi from "@/apis/user.api";
import AdminSidebar from "@/components/admin-sidebar";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

export const metadata: Metadata = {
  title: "Admin | BK Sharing",
  description: "Admin page for BK Sharing",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { sessionToken, role } = useGetFromCookie(["sessionToken", "role"]);

  let user = null;

  if (sessionToken) {
    const {
      payload: { data },
    } = await userApi.getMe(sessionToken);
    user = data;
  }

  return (
    <main className="flex justify-center">
      {user && <AdminSidebar user={user} role={role} />}
      <div className="w-full px-10 py-5">{children}</div>
    </main>
  );
};
export default AdminLayout;
