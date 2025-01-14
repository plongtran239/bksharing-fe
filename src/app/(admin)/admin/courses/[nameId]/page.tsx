import adminApi from "@/apis/admin.api";
import CourseDetail from "@/app/(admin)/admin/courses/[nameId]/components/course-detail";
import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { getIdFromNameId } from "@/lib/utils";

const DetailCoursePage = async ({
  params: { nameId },
}: {
  params: {
    nameId: string;
  };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await adminApi.getDetailCourse(sessionToken, getIdFromNameId(nameId));

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Course Detail</h1>

        <BackButton />
      </div>

      <Separator className="my-5" />

      <CourseDetail course={data} />
    </main>
  );
};
export default DetailCoursePage;
