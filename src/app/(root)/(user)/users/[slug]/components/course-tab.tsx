import Image from "next/image";
import Link from "next/link";

import courseApi from "@/apis/course.api";
import { COURSE_STATUS } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { generateNameId } from "@/lib/utils";

interface IProps {
  mentorId: number;
  isAccepted: boolean;
}

const CourseTab = async ({ mentorId, isAccepted }: IProps) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  if (!isAccepted) {
    return (
      <div className="w-full rounded-xl bg-white p-5">
        <p>No courses available for this mentor yet!</p>
      </div>
    );
  }

  const {
    payload: { data: courses },
  } = await courseApi.getCoursesByMentorId(
    sessionToken,
    mentorId,
    COURSE_STATUS.APPROVED
  );

  return (
    <section className="w-full rounded-xl bg-white p-5">
      <h2 className="text-2xl font-semibold text-primary">
        Courses ({courses.length})
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {courses.length === 0 && (
          <p className="text-sm text-black">There are no courses!</p>
        )}

        {courses.length > 0 &&
          courses.map((course) => (
            <Link
              href={`/courses/${generateNameId({
                id: course.id,
                name: course.name,
              })}`}
              key={course.id}
              className="space-y-3"
            >
              <div className="relative h-[211px] w-[375px]">
                <Image
                  src={
                    course.image?.originalUrl ||
                    "/images/default-background.png"
                  }
                  alt=""
                  fill
                  priority
                  className="rounded-xl border border-primary"
                />
              </div>

              <h3 className="capitalize text-black">{course.name}</h3>

              <p className="text-sm">
                <span>{course.totalDuration} total hours</span>
                <span className="mx-2">•</span>
                <span>{course.countOfSections} sections</span>
              </p>

              <p className="text-primary">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(course.price)}
              </p>
            </Link>
          ))}
      </div>
    </section>
  );
};
export default CourseTab;
