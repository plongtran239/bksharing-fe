import { cookies } from "next/headers";

import userApi from "@/apis/user.api";
import MentorTable from "@/app/(admin)/admin/mentors/components/mentor-tables";

const AdminMentor = async () => {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("sessionToken")?.value;

  const { payload } = await userApi.adminMentors(sessionToken as string);

  return <MentorTable data={payload.data} />;
};
export default AdminMentor;
