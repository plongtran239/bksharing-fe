import meetingApi from "@/apis/meeting.api";
import MeetingTable from "@/app/(admin)/admin/meetings/components/meeting-tables";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const AdminUpcoming = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const { payload } = await meetingApi.getAdminMeetings(sessionToken);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-primary">
        Danh sách cuộc gọi
      </h1>

      <Separator className="my-5" />

      <MeetingTable data={payload.data} />
    </div>
  );
};
export default AdminUpcoming;
