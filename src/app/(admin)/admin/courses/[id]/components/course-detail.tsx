import Image from "next/image";

import { CourseDetailType } from "@/schemas";

const CourseDetail = ({ course }: { course: CourseDetailType }) => {
  return (
    <section className="flex-center">
      <div className="w-3/4 space-y-5">
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
              {Intl.NumberFormat("en-EN", {
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
          <p className="text-lg font-semibold text-secondary-foreground">
            Description
          </p>

          <p className="mt-2 text-sm text-black">
            {course.description || "No description"}
          </p>
        </div>

        {/* Objectives */}
        <div className="rounded-xl bg-secondary p-5">
          <p className="text-lg font-semibold text-secondary-foreground">
            Objectives
          </p>

          <div className="mt-2 grid grid-cols-2 gap-10">
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
        <div className="rounded-xl bg-secondary p-5">
          <p className="text-lg font-semibold text-secondary-foreground">
            Requirements
          </p>

          {course.prerequisites.length > 0 ? (
            <div className="mt-2 grid grid-cols-2 gap-10">
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

        {/* Sections */}
        <div className="rounded-xl bg-secondary p-5">
          <p className="text-lg font-semibold text-secondary-foreground">
            Sections
          </p>

          {course.sections.map((section, index) => (
            <div key={index} className="mt-5 rounded-xl bg-secondary p-5">
              <p className="text-lg font-semibold text-secondary-foreground">
                section {index + 1}: {section.title}
              </p>
              <p className="mt-2 text-sm text-black">
                {section.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CourseDetail;
