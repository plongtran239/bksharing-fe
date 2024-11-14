import { Clock12Icon, Grid2X2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { generateNameId } from "@/lib/utils";
import { CourseType } from "@/schemas";

interface IProps {
  course: CourseType;
}

const CourseCard = ({ course }: IProps) => {
  return (
    <Link
      href={`courses/${generateNameId({
        id: course.id,
        name: course.name,
      })}`}
      className="space-y-5 rounded-xl border border-primary bg-white p-5 shadow-2xl transition-all hover:scale-105"
    >
      <div className="relative h-[12rem] w-full">
        <Image
          src={course.image?.originalUrl || "/images/landing-1.png"}
          alt=""
          fill
          className="rounded-xl"
        />
      </div>

      <div className="flex-between">
        <div className="flex-center gap-1">
          <Grid2X2Icon size={16} />
          <p className="text-sm">{course.category.name}</p>
        </div>

        <div className="flex-center gap-1">
          <Clock12Icon size={16} />
          <p className="text-sm">{course.totalDuration}h</p>
        </div>
      </div>

      <p className="text-black">{course.name}</p>

      <p className="line-clamp-3 text-sm">
        {course.description || "No description"}
      </p>

      <div className="flex-between">
        <div className="flex-center gap-2 text-sm">
          <div className="relative h-5 w-5 rounded-full">
            <Image
              src={
                course.mentor.avatar?.originalUrl || "/images/default-user.png"
              }
              alt=""
              fill
              className="rounded-full"
            />
          </div>
          <p>{course.mentor.name}</p>
        </div>

        <p className="font-semibold text-primary">
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(course.price)}
        </p>
      </div>
    </Link>
  );
};
export default CourseCard;
