import { PlusIcon } from "lucide-react";
import Link from "next/link";

import courseApi from "@/apis/course.api";
import userApi from "@/apis/user.api";
import CourseTable from "@/app/(mentor)/mentor/courses/components/course-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const MentorCourse = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data: mentor },
  } = await userApi.getMentorProfile(sessionToken);

  const {
    payload: { data },
  } = await courseApi.getCoursesByMentorId(sessionToken, mentor.id);

  return (
    <section>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Danh sách khóa học
        </h1>

        <Link href="/course/create">
          <Button className="flex-center gap-2">
            <PlusIcon size={16} />
            Tạo khóa học
          </Button>
        </Link>
      </div>

      <Separator className="my-5" />

      <CourseTable data={data} />
    </section>
  );
};
export default MentorCourse;
