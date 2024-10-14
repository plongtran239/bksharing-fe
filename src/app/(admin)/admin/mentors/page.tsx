import { cookies } from "next/headers";

import adminApi from "@/apis/admin.api";
import MentorTable from "@/app/(admin)/admin/mentors/components/mentor-table";
import { Separator } from "@/components/ui/separator";

const AdminMentor = async () => {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("sessionToken")?.value;

  const { payload } = await adminApi.getAdminMentors(sessionToken as string);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Mentor List</h1>
      </div>

      <Separator className="my-5" />

      <MentorTable data={payload.data} />
    </main>
  );
};
export default AdminMentor;
