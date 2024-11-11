import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import adminApi from "@/apis/admin.api";
import CourseDetail from "@/app/(admin)/admin/courses/[id]/components/course-detail";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const DetailCoursePage = async ({
  params: { id },
}: {
  params: {
    id: number;
  };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await adminApi.getDetailCourse(sessionToken, id);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Course Detail</h1>

        <Link href="/admin/courses">
          <Button className="flex-center gap-2">
            <ChevronLeftIcon size={16} />
            Back to Course List
          </Button>
        </Link>
      </div>

      <Separator className="my-5" />

      <CourseDetail course={data} />
    </main>
  );
};
export default DetailCoursePage;
