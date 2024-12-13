import meetingApi from "@/apis/meeting.api";
import MeetingTable from "@/app/(mentor)/mentor/appointments/components/meeting-table";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const MeetingList = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await meetingApi.getClientMeetings(sessionToken);

  return <MeetingTable data={data} />;
};
export default MeetingList;
