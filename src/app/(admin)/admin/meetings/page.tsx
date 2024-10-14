import { cookies } from "next/headers";

import MeetingApi from "@/apis/meeting.api";
import MeetingTable from "@/app/(admin)/admin/meetings/components/meeting-tables";
import { Separator } from "@/components/ui/separator";

const AdminUpcoming = async () => {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("sessionToken")?.value;

  const { payload } = await MeetingApi.getMeetings(sessionToken as string);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-primary">Meeting List</h1>

      <Separator className="my-5" />

      <MeetingTable data={payload.data} />
    </div>
  );
};
export default AdminUpcoming;
