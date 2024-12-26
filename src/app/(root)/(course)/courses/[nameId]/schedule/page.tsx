import ScheduleApi from "@/apis/schedule.api";
import Schedule from "@/app/(root)/(course)/courses/[nameId]/schedule/components/schedule";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { getIdFromNameId, getNameFromNameId } from "@/lib/utils";
import { ScheduleType } from "@/schemas/schedule.schema";

interface IProps {
  searchParams: {
    [key: string]: string | undefined;
  };
  params: {
    nameId: string;
  };
}

const CourseSchedule = async ({
  searchParams: { mentor },
  params: { nameId },
}: IProps) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);
  const mentorNameId = mentor as string;

  const courseId = getIdFromNameId(decodeURIComponent(nameId));
  const courseName = getNameFromNameId(decodeURIComponent(nameId));
  const mentorId = getIdFromNameId(decodeURIComponent(mentorNameId));
  const mentorName = getNameFromNameId(decodeURIComponent(mentorNameId));

  let schedules: ScheduleType[] = [];

  try {
    const {
      payload: { data },
    } = await ScheduleApi.getSchedulesByMentorId(sessionToken, mentorId);

    schedules = data;
  } catch (error) {
    console.error({ error });
  }

  return (
    <Schedule
      schedules={schedules}
      mentorName={mentorName}
      courseId={courseId}
      courseName={courseName}
      mentorId={mentorId}
    />
  );
};
export default CourseSchedule;
