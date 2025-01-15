"use client";

import { Clock12Icon, Grid2X2Icon } from "lucide-react";
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
      className="cursor-pointer"
    >
      <CardContent
        className={cn(
          "flex aspect-square h-[356px] w-full items-center justify-center p-4",
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

          {!isLearned && (
            <p className="line-clamp-2 min-h-10 text-sm text-foreground">
              {course.description || "Không có mô tả"}
            </p>
          )}

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
        </div>
      </CardContent>
    </Card>
  );
};
export default CourseCard;
