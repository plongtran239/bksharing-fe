"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { CircleUserRoundIcon, Clock12Icon, Grid2X2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { cn, generateNameId } from "@/lib/utils";
import { CourseType } from "@/schemas";

interface IProps {
  course: CourseType;
  isLearned: boolean;
}

const CourseCard = ({ course, isLearned }: IProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() =>
        router.push(
          `courses/${generateNameId({
            id: course.id,
            name: course.name,
          })}`
        )
      }
      className="cursor-pointer transition-transform hover:-translate-y-2 hover:shadow-lg"
    >
      <CardContent
        className={cn(
          "flex aspect-square h-[380px] w-full items-center justify-center p-4",
          {
            "h-fit": isLearned,
          }
        )}
      >
        <div className="space-y-3 rounded-xl">
          <div className="relative h-40 w-[234px]">
            <Image
              src={
                course.image?.originalUrl || "/images/default-background.png"
              }
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

          <p className="line-clamp-1 text-black">{course.name}</p>

          <div className="flex-between">
            <div className="flex-center gap-2 text-sm">
              <div className="relative h-5 w-5 rounded-full">
                <Image
                  src={
                    course.mentor.thumbnail?.originalUrl ||
                    "/images/default-user.png"
                  }
                  alt=""
                  fill
                  className="rounded-full"
                />
              </div>
              <p>{course.mentor.name}</p>
            </div>

            {!isLearned && (
              <p className="font-semibold text-primary">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(course.price)}
              </p>
            )}
          </div>

          {!isLearned && (
            <p className="line-clamp-2 min-h-10 text-sm text-foreground">
              {course.description || "Không có mô tả"}
            </p>
          )}

          {!isLearned && (
            <div className="w-full text-sm">
              <div className="flex-between w-full text-sm text-primary">
                <div className="flex-center gap-1">
                  <CircleUserRoundIcon size={16} />
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default CourseCard;
