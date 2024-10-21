import MeetingApi from "@/apis/meeting.api";
import MeetingTable from "@/app/(admin)/admin/meetings/components/meeting-tables";
import { Separator } from "@/components/ui/separator";
import { useGetToken } from "@/hooks/use-get-token";

const AdminUpcoming = async () => {
  const sessionToken = useGetToken();

  const { payload } = await MeetingApi.getMeetings(sessionToken);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-primary">Meeting List</h1>

      <Separator className="my-5" />

      <MeetingTable data={payload.data} />
    </div>
  );
};
export default AdminUpcoming;
