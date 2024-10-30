import Image from "next/image";
import Link from "next/link";

import { convertToCapitalizeCase } from "@/lib/utils";
import { CourseType } from "@/schemas";

const CourseCard = ({ course }: { course: CourseType }) => {
  return (
    <Link
      href={`/mentor/courses/${course.id}`}
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
          <h2 className="font-semibold text-black">{course.name}</h2>

          <p className="text-sm">Category: {course.category.name}</p>

          <p className="text-sm">
            Type: {convertToCapitalizeCase(course.courseType)}
          </p>
        </div>

        <div className="space-y-2 text-black">
          <p>
            {course.countOfSections}{" "}
            <span>{course.countOfSections === 1 ? "section" : "sections"}</span>
          </p>

          <p>{course.totalDuration} hours</p>
        </div>
      </div>

      <div className="group-hover:flex-center hidden font-semibold text-primary group-hover:block group-hover:flex-1">
        Edit / Manage Course
      </div>
    </Link>
  );
};
export default CourseCard;
