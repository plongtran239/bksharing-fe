import courseApi from "@/apis/course.api";
import CourseList from "@/app/(root)/(course)/courses/components/couse-list";

const PopularCourses = async () => {
  const {
    payload: { data: courses },
  } = await courseApi.getCourses();

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-primary">
          Khóa Học Phổ Biến
        </h2>
        <p className="text-sm text-gray-500">
          Các khóa học được nhiều người tham gia nhất
        </p>
      </div>

      {/* Popular */}
      <CourseList courses={courses} isLearned={false} />
    </div>
  );
};
export default PopularCourses;
