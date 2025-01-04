"use client";

import { Clock12Icon, Grid2X2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { generateNameId } from "@/lib/utils";
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
      <CardContent className="flex aspect-square items-center justify-center p-4">
        <div className="space-y-5 rounded-xl">
          <div className="relative h-40 w-full">
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

          <p className="text-black">{course.name}</p>

          {!isLearned && (
            <p className="line-clamp-2 min-h-10 text-sm">
              {course.description || "Không có mô tả"}
            </p>
          )}

          <div className="flex-between">
            <div className="flex-center gap-2 text-sm">
              <div className="relative h-5 w-5 rounded-full">
                <Image
                  src={
                    course.mentor.avatar?.originalUrl ||
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
