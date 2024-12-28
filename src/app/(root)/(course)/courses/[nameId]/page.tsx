import { StarFilledIcon } from "@radix-ui/react-icons";
import { ChevronsUpDownIcon, ClockIcon, PaperclipIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import courseApi from "@/apis/course.api";
import feedbackApi from "@/apis/feedback.api";
import FeedbackCard from "@/app/(root)/(course)/courses/[nameId]/components/feedback-card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { REVIEW_TYPE } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import {
  cn,
  convertMilisecondsToLocaleDateString,
  generateNameId,
  getIdFromNameId,
} from "@/lib/utils";

export const metadata: Metadata = {
  title: "Course Detail | BK Sharing",
  description: "Course Detail Page",
};

const CourseDetailPage = async ({
  params: { nameId },
}: {
  params: { nameId: string };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  let course = null;
  let feedbacks = null;

  if (sessionToken) {
    try {
      const {
        payload: { data: apiCourse },
      } = await courseApi.getCourseById(sessionToken, getIdFromNameId(nameId));

      course = apiCourse;

      const {
        payload: { data: apiFeedbacks },
      } = await feedbackApi.getFeedbacks({
        relationType: REVIEW_TYPE.COURSE,
        relationId: course.id,
      });

      feedbacks = apiFeedbacks;
    } catch (error) {
      console.error(error);
    }
  }

  if (!course) {
    notFound();
  }

  if (!feedbacks) {
    notFound();
  }

  const totalRating = feedbacks.reduce(
    (acc, feedback) => acc + feedback.courseRating,
    0
  );

  return (
    <main className="relative">
      <div className="absolute left-0 top-0 -z-50 min-h-[296px] w-full bg-secondary" />

      <div className="container relative grid grid-cols-3 py-10">
        <section className="col-span-2 w-11/12">
          {/* Course info */}
          <div className="flex min-h-[212px] flex-col justify-center space-y-5">
            <h1 className="line-clamp-2 text-2xl font-semibold text-secondary-foreground">
              {course.name}
            </h1>

            <p className="line-clamp-5 text-black">
              {course.description || "Không có mô tả"}
            </p>

            <p className="text-sm">
              Tạo bởi{" "}
              <Link
                href={`/users/${generateNameId({
                  id: course.mentor.id,
                  name: course.mentor.name,
                })}`}
                className="capitalize text-secondary-foreground underline"
              >
                {course.mentor.name}
              </Link>{" "}
              vào ngày {convertMilisecondsToLocaleDateString(course.createdAt)}
            </p>
          </div>

          {/* Objectives */}
          <div className="mt-20 space-y-5 rounded-xl border border-primary bg-secondary p-5 text-sm">
            <h2 className="text-xl font-semibold text-secondary-foreground">
              Bạn sẽ học được gì?
            </h2>

            <div className="mt-2 grid grid-cols-2 gap-x-10 space-y-2">
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

          {/* Sections */}
          <div className="mt-5 rounded-xl">
            <div className="flex items-center gap-2 text-lg font-semibold text-secondary-foreground">
              <p className="">{course.sections.length} phần</p>
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              <p>{course.totalDuration}h để hoàn thành</p>
            </div>

            <div className="mt-5 space-y-5">
              {course.sections.map((section, index) => {
                return (
                  <Collapsible
                    key={section.id}
                    defaultOpen={section.isPublic}
                    disabled={!section.isPublic}
                  >
                    {/* Section Title, Duration & Visibility */}
                    <CollapsibleTrigger className="group flex w-full justify-between overflow-hidden rounded-t-xl border border-primary bg-secondary text-left">
                      <div className="flex-between w-full gap-5 p-5">
                        <h3 className="flex flex-1 items-center gap-2 font-semibold text-secondary-foreground">
                          <span className="line-clamp-1 flex-1">
                            Phần {index + 1}: {section.title}
                          </span>
                          <ChevronsUpDownIcon
                            size={16}
                            className={cn("hidden", {
                              "group-hover:block": section.isPublic,
                            })}
                          />
                        </h3>
                        <p className="flex items-center gap-2 text-sm">
                          <ClockIcon size={16} />
                          {section.duration || 0}h
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
                          : "Không có mô tả"}
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
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-5 rounded-xl">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-secondary-foreground">
              <div className="flex items-center gap-1">
                <StarFilledIcon className="h-5 w-5 text-yellow-500" />
                {(totalRating / feedbacks.length).toFixed(1) || 0}
              </div>
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              {feedbacks?.length || 0} Lượt đánh giá
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-5">
              {feedbacks.map((feedback, index) => (
                <FeedbackCard key={index} feedback={feedback} />
              ))}
            </div>
          </div>
        </section>

        <section className="sticky right-0 top-20 col-span-1 h-fit space-y-5 overflow-hidden rounded-xl bg-white pb-10 shadow-2xl">
          <div className="relative h-[211px] w-[375px]">
            <Image
              src={course.image?.originalUrl || "/images/placeholder-2.jpg"}
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 100vw,"
            />
          </div>

          <div className="space-y-5 px-5">
            {/* Price */}
            <p className="text-3xl font-semibold text-primary">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(course.price)}
            </p>

            <Link
              href={`${nameId}/schedule?mentor=${generateNameId({
                name: course.mentor.name,
                id: course.mentor.id,
              })}`}
              className="block"
            >
              <Button className="w-full">Đăng ký</Button>
            </Link>

            {/* Info */}
            <div className="space-y-2">
              <p className="font-medium text-black">Khóa học bao gồm:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  {course.totalDuration} giờ học để hoàn thành
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  {course.sections.length} phần để học
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  {course.sections.reduce(
                    (acc, section) => acc + section.files.length,
                    0
                  )}{" "}
                  tài liệu để tải về
                </li>
              </ul>
            </div>

            {/* Target */}
            <div className="space-y-2">
              <p className="font-medium text-black">Phù hợp với:</p>
              <ul className="space-y-2 text-sm">
                {course.targetAudiences.map((targetAudience, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 capitalize"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    {targetAudience.toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <p className="font-medium text-black">Yêu cầu khi đăng ký:</p>
              <ul className="space-y-2 text-sm">
                {course.prerequisites.length > 0
                  ? course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        {prerequisite}
                      </li>
                    ))
                  : "Không có"}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default CourseDetailPage;
