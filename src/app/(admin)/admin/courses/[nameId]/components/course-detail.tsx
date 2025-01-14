import Image from "next/image";

import CourseFeedbacks from "@/app/(admin)/admin/courses/[nameId]/components/course-feedbacks";
import CourseSections from "@/app/(admin)/admin/courses/[nameId]/components/course-sections";
import { Separator } from "@/components/ui/separator";
import { CourseDetailType } from "@/schemas";

const CourseDetail = ({ course }: { course: CourseDetailType }) => {
  return (
    <section className="grid grid-cols-3 gap-5">
      <div className="col-span-2 w-full space-y-5">
        <div className="flex items-center gap-10 rounded-xl bg-secondary p-5">
          {/* Thumbnail */}
          <div className="relative h-[211px] w-[375px]">
            <Image
              src={
                course.image?.originalUrl || "/images/default-background.png"
              }
              alt=""
              fill
              priority
              className="rounded-xl"
            />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <p className="text-xl font-semibold text-secondary-foreground">
              {course.name}
            </p>
            <p className="text-black">{course.category.name}</p>
            <p className="text-lg font-medium text-primary">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(course.price)}
            </p>

            <div className="">
              {course.targetAudiences.map((targetAudience, index) => (
                <span key={index} className="text-sm capitalize text-black">
                  {targetAudience.toLowerCase()}
                  {index !== course.targetAudiences.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl bg-secondary p-5">
          <p className="text-sm font-semibold text-secondary-foreground">
            Description
          </p>

          <p className="mt-2 text-sm text-black">
            {course.description || "No description"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Objectives */}
          <div className="rounded-xl bg-secondary p-5 text-sm">
            <p className="font-semibold text-secondary-foreground">
              Objectives
            </p>

            <div className="mt-2 space-y-2">
              {course.objectives.map((objective, index) => (
                <div key={index} className="flex-center gap-5">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <p className="line-clamp-2 flex-1 text-sm text-black">
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-xl bg-secondary p-5 text-sm">
            <p className="font-semibold text-secondary-foreground">
              Requirements
            </p>

            {course.prerequisites.length > 0 ? (
              <div className="mt-2 space-y-2">
                {course.prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex-center gap-5">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <p className="line-clamp-2 flex-1 text-sm text-black">
                      {prerequisite}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-black">No requirements</p>
            )}
          </div>
        </div>

        <Separator />

        {/* Sections */}
        <CourseSections course={course} />
      </div>

      <CourseFeedbacks courseId={course.id} />
    </section>
  );
};
export default CourseDetail;
