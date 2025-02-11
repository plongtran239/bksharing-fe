"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { ArchiveXIcon, CircleUserRoundIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import courseApi from "@/apis/course.api";
import Loader from "@/components/loader";
import { generateNameId } from "@/lib/utils";
import { CourseType } from "@/schemas";

const CourseTab = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const fetchLearnedCourses = async () => {
      try {
        setLoading(true);
        const {
          payload: { data: courses },
        } = await courseApi.getLearnedCourseClient();

        setCourses(courses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearnedCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex-center flex-col gap-3 rounded-lg bg-white px-5 py-10">
        <Loader />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex-center flex-col gap-3 rounded-lg bg-white px-5 py-10">
        <ArchiveXIcon size={24} className="" />
        <h2 className="font-semibold">Không có khóa học nào!</h2>
      </div>
    );
  }

  return (
    <section className="w-full rounded-xl bg-white p-5">
      <h2 className="text-2xl font-semibold text-primary">
        Khóa học đã đăng ký ({courses.length})
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
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
              <div className="relative h-64 w-full">
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

              <h3 className="line-clamp-2 font-semibold capitalize text-black">
                {course.name}
              </h3>

              <div className="flex-between">
                <p className="text-sm">
                  <span>{course.totalDuration}h để học</span>
                  <span className="mx-2">•</span>
                  <span>{course.countOfSections} phần</span>
                </p>
              </div>

              <div className="flex-between">
                <div className="flex-center gap-1">
                  <CircleUserRoundIcon size={16} className="text-primary" />
                  <span className="text-black">
                    {course.noOfSubscriptions} lượt đăng ký
                  </span>
                </div>

                <div className="flex-center gap-1">
                  <span className="text-black">
                    {course.rateOfCourse.toFixed(1)}
                  </span>
                  <StarFilledIcon className="text-yellow-400" />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};
export default CourseTab;
