import { notFound } from "next/navigation";

import courseApi from "@/apis/course.api";
import CourseTab from "@/app/(mentor)/mentor/courses/[nameId]/components/course-tab";
import Status from "@/app/(mentor)/mentor/courses/[nameId]/components/status";
import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import { COURSE_STATUS } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { cn, getIdFromNameId } from "@/lib/utils";

const CourseDetail = async ({
  params: { nameId },
}: {
  params: { nameId: string };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  let course = null;

  if (sessionToken) {
    try {
      const {
        payload: { data },
      } = await courseApi.getCourseById(sessionToken, getIdFromNameId(nameId));

      course = data;
    } catch (error) {
      console.error(error);
    }
  }

  if (!course) {
    notFound();
  }

  const handleCalculateCourseCompletion = () => {
    const totalSections = 5;
    const sectionWeight = 100 / totalSections;

    const completedSections = [
      course.name,
      course.category,
      course.image?.fileId,
      course.objectives.length > 0,
      course.sections.length > 0,
    ].filter(Boolean).length;

    return completedSections * sectionWeight;
  };

  const completion = handleCalculateCourseCompletion();

  return (
    <section>
      <div className="flex-between">
        <div className="flex-center gap-2">
          <h1 className="align-middle text-3xl font-semibold text-primary">
            <span>Chi tiết khóa học</span>
          </h1>
          <span
            className={cn("rounded-xl px-2 py-1 text-sm text-white", {
              "bg-foreground/30": course.status === COURSE_STATUS.DRAFT,
              "bg-secondary text-secondary-foreground":
                course.status === COURSE_STATUS.PENDING,
              "bg-green-500 text-white":
                course.status === COURSE_STATUS.APPROVED,
              "bg-red-500 text-white": course.status === COURSE_STATUS.REJECTED,
            })}
          >
            <Status status={course.status} />
          </span>
        </div>

        <BackButton />
      </div>

      <Separator className="my-5" />

      {completion < 100 && (
        <div className="mb-5 space-y-2 rounded-xl border border-yellow-200 bg-yellow-100 p-5 text-sm text-black">
          <p>
            Hoàn thành {completion}% thông tin khóa học. Bạn cần hoàn thành các
            thông tin sau:
          </p>
          <p>
            - Thông tin khóa học: Tên khóa học, danh mục, hình ảnh của khóa học.
          </p>
          <p>- Nội dung khóa học: Thêm phần học vào nội dung khóa học</p>
        </div>
      )}

      <CourseTab course={course} />
    </section>
  );
};
export default CourseDetail;
