"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { StudentSubscriptionType } from "@/schemas/subscription.schema";

const StudentCard = ({ student }: { student: StudentSubscriptionType }) => {
  const t = useTranslations("reportType");

  return (
    <div className="space-y-3 rounded-xl border border-primary bg-secondary p-5">
      <div>
        <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
        <span>Tên học viên: </span>
        <div className="inline-flex items-center gap-2">
          <span className="text-secondary-foreground">{student.info.name}</span>
          <div className="relative h-8 w-8">
            <Image
              src={
                student.info.thumbnail?.originalUrl ||
                "/images/default-user.png"
              }
              alt=""
              fill
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
        <span>Email học viên: </span>
        <span className="text-secondary-foreground">{student.info.email}</span>
      </div>

      <div>
        <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
        <span>Số điện thoại học viên: </span>
        <span className="text-secondary-foreground">
          {student.info.phoneNumber}
        </span>
      </div>

      <Separator className="my-2" />

      <div className="space-y-3">
        <div>
          {student.feeback ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white p-3">
                <div className="flex items-center justify-between">
                  <span>Gia sư</span>

                  <div className="inline-flex items-center gap-2">
                    <StarFilledIcon className="text-yellow-400" />
                    <span>{student.feeback.mentorRating}</span>
                  </div>
                </div>

                <Separator className="my-1" />

                <div className="flex items-center gap-2">
                  <span>{student.feeback.mentorReview}</span>
                </div>
              </div>

              <div className="rounded-lg bg-white p-3">
                <div className="flex items-center justify-between">
                  <span>Khóa học</span>

                  <div className="inline-flex items-center gap-2">
                    <StarFilledIcon className="text-yellow-400" />
                    <span>{student.feeback.courseRating}</span>
                  </div>
                </div>

                <Separator className="my-1" />

                <div className="flex items-center gap-2">
                  <span>{student.feeback.courseReview}</span>
                </div>
              </div>
            </div>
          ) : (
            <span>Chưa có đánh giá</span>
          )}
        </div>
      </div>

      {student.report && (
        <div>
          <Separator className="my-2" />

          <div className="space-y-3">
            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-red-500" />
              <span>Báo cáo vi phạm: </span>
              <span className="text-secondary-foreground">
                {t(student.report.type.toLowerCase())}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-red-500" />
              <span>Lí do: </span>
              <span className="text-secondary-foreground">
                {student.report.description}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-red-500" />
              <span>Hướng giải quyết: </span>
              <span className="text-secondary-foreground">
                {student.report.resolution}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StudentCard;
