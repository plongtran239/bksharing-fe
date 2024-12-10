import ScheduleApi from "@/apis/schedule.api";
import Schedule from "@/app/(root)/(user)/users/[slug]/schedule/components/schedule";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { getIdFromNameId, getNameFromNameId } from "@/lib/utils";
import { ScheduleType } from "@/schemas/schedule.schema";

const MentorSchedulePage = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const mentorId = getIdFromNameId(slug);
  const mentorName = getNameFromNameId(decodeURIComponent(slug).toLowerCase());

  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  let schedules: ScheduleType[] = [];

  try {
    const {
      payload: { data },
    } = await ScheduleApi.getSchedulesByMentorId(sessionToken, mentorId);

    schedules = data;
  } catch (error) {
    console.error({ error });
  }

  return <Schedule schedules={schedules} mentorName={mentorName} />;
};
export default MentorSchedulePage;
