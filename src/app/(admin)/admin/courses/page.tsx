import adminApi from "@/apis/admin.api";
import CourseTable from "@/app/(admin)/admin/courses/components/course-table";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const AdminCourse = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await adminApi.getAdminCourses(sessionToken);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Danh sách khóa học
        </h1>
      </div>

      <Separator className="my-5" />

      <CourseTable data={data} />
    </main>
  );
};
export default AdminCourse;
