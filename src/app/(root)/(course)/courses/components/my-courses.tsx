import courseApi from "@/apis/course.api";
import CourseList from "@/app/(root)/(course)/courses/components/couse-list";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const MyCourses = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  if (!sessionToken) {
    return null;
  }

  const {
    payload: { data: courses },
  } = await courseApi.getLearnedCourses(sessionToken);

  if (courses.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-primary">
          Khóa Học Của Tôi
        </h2>
        <p className="text-sm text-gray-500">Tất cả khóa học bạn đã tham gia</p>
      </div>
      <CourseList courses={courses} isLearned />
    </div>
  );
};
export default MyCourses;
