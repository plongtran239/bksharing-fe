import { ChevronsUpDownIcon, PaperclipIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
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

            <div className="mt-2 gap-10 space-y-2">
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
        </div>

        <Separator />

        {/* Sections */}
        <div className="rounded-xl">
          <div className="flex items-center gap-2 text-lg font-semibold text-secondary-foreground">
            <p className="">{course.sections.length} sections</p>
            <div className="h-1 w-1 rounded-full bg-primary"></div>
            <p>{course.totalDuration}h total length</p>
          </div>

          <div className="mt-5 space-y-5">
            {course.sections.map((section, index) => (
              <Collapsible key={section.id} defaultOpen>
                {/* Section Title, Duration & Visibility */}
                <CollapsibleTrigger className="group flex w-full justify-between overflow-hidden rounded-t-xl border border-primary bg-secondary text-left">
                  <div className="w-full space-y-2 p-5">
                    <h3 className="flex items-center gap-2 font-semibold text-secondary-foreground">
                      <span className="line-clamp-1">
                        Section {index + 1}: {section.title}
                      </span>
                      <ChevronsUpDownIcon
                        size={16}
                        className="hidden group-hover:block"
                      />
                    </h3>
                    <p className="text-sm">
                      Duration: {section.duration || 0}h -{" "}
                      {section.isPublic ? "Public" : "Private"}
                    </p>
                  </div>
                </CollapsibleTrigger>

                {/* Description & Files */}
                <CollapsibleContent className="space-y-5 rounded-b-xl border border-primary border-t-transparent p-5">
                  <p className="text-sm text-black">
                    {section.description !== ""
                      ? section.description
                          .trim()
                          .split("\n")
                          .map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))
                      : "No description"}
                  </p>

                  {section.files && section.files.length > 0 && (
                    <>
                      <Separator />
                      <div className="my-1 space-y-1">
                        {section.files.map((file, index) => {
                          return (
                            <div
                              key={index}
                              className="flex-between rounded-lg bg-secondary p-2"
                            >
                              <Link
                                href={file.url || "#"}
                                className="max-w-2/3 flex items-center gap-2 text-sm"
                                target="_blank"
                              >
                                <PaperclipIcon size={16} />
                                <span className="line-clamp-1 flex-1">
                                  {file.url}
                                </span>
                                <span>
                                  ({(file.fileSize / 1000).toFixed(1)} kB)
                                </span>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default CourseDetail;
