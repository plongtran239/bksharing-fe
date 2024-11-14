import Image from "next/image";
import Link from "next/link";

import { Progress } from "@/components/ui/progress";
import { cn, convertToCapitalizeCase, generateNameId } from "@/lib/utils";
import { CourseType } from "@/schemas";

const CourseCard = ({ course }: { course: CourseType }) => {
  const handleCalculateCourseCompletion = () => {
    const totalSections = 5;
    const sectionWeight = 100 / totalSections;

    const completedSections = [
      course.name,
      course.category,
      course.image?.fileId,
      course.objectives.length > 0,
      course.countOfSections > 0,
    ].filter(Boolean).length;

    return completedSections * sectionWeight;
  };

  const completion = handleCalculateCourseCompletion();

  return (
    <Link
      href={`/mentor/courses/${generateNameId({
        name: course.name,
        id: course.id,
      })}`}
      className="group flex items-center overflow-hidden rounded-xl border border-primary"
    >
      <div className="relative h-24 w-24">
        <Image
          src={course.image?.originalUrl || "/images/placeholder.jpg"}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw,"
        />
      </div>

      <div className="flex-between flex-1 px-5 group-hover:hidden">
        <div className="space-y-1">
          <h2 className="line-clamp-1 max-w-96 font-semibold capitalize text-black">
            {course.name}
          </h2>

          <p className="text-sm">{course.category.name}</p>

          <p className="text-sm">
            <span className="text-black">
              {convertToCapitalizeCase(course.status)}
            </span>{" "}
            - {convertToCapitalizeCase(course.courseType)}
          </p>
        </div>

        <div className="flex items-center justify-end gap-10">
          <div className="space-y-2">
            <div className="flex-between">
              <div>
                <p
                  className={cn({
                    hidden: completion === 100,
                  })}
                >
                  Finish setup your course
                </p>
              </div>
              <p>{completion}% complete</p>
            </div>
            <Progress value={completion} className="w-[500px]" />
          </div>

          <div className="space-y-2 text-black">
            <p>
              {course.countOfSections}{" "}
              <span>
                {course.countOfSections === 1 ? "section" : "sections"}
              </span>
            </p>

            <p>{course.totalDuration} hours</p>
          </div>
        </div>
      </div>

      <div className="group-hover:flex-center hidden font-semibold text-primary group-hover:block group-hover:flex-1">
        Edit / Manage Course
      </div>
    </Link>
  );
};
export default CourseCard;
