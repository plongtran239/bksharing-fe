import courseApi from "@/apis/course.api";
import userApi from "@/apis/user.api";
import CourseCard from "@/app/(mentor)/mentor/courses/components/course-card";
import { COURSE_STATUS } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { CourseType } from "@/schemas";

const CourseList = async ({ status }: { status: COURSE_STATUS }) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  let courses: CourseType[] = [];

  if (sessionToken) {
    const {
      payload: { data: mentor },
    } = await userApi.getMentorProfile(sessionToken);

    const {
      payload: { data },
    } = await courseApi.getCoursesByMentorId(sessionToken, mentor.id, status);

    courses = data;
  }

  if (courses.length === 0) {
    return <div>No course found</div>;
  }

  return (
    <div className="space-y-5">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
export default CourseList;
