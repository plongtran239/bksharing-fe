import { cookies } from "next/headers";

import adminApi from "@/apis/admin.api";
import MentorTable from "@/app/(admin)/admin/mentors/components/mentor-table";

const AdminMentor = async () => {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("sessionToken")?.value;

  const { payload } = await adminApi.getAdminMentors(sessionToken as string);

  return <MentorTable data={payload.data} />;
};
export default AdminMentor;
