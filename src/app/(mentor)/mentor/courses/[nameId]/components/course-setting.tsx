"use client";

import { CheckCircleIcon, RefreshCwIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import courseApi from "@/apis/course.api";
import Status from "@/app/(mentor)/mentor/courses/[nameId]/components/status";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { COURSE_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { CourseDetailType } from "@/schemas";

const CourseSetting = ({
  course,
  isEdit,
  setIsEdit,
}: {
  course: CourseDetailType;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(course.isPublic);

  useEffect(() => {
    if (isPublic !== course.isPublic) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic]);

  const handleCalculateCourseCompletion = () => {
    const totalSections = 5;
    const sectionWeight = 100 / totalSections;

    const completedSections = [
      course.name,
      course.category,
      course.image?.fileId,
      course.objectives.length > 0,
      course.sections.length > 0,
    ].filter(Boolean).length;

    return completedSections * sectionWeight;
  };

  const completion = handleCalculateCourseCompletion();

  const handleSave = async () => {
    try {
      await courseApi.updateCourse(course.id, {
        isPublic,
        status: course.status,
        objectives: course.objectives,
        price: course.price,
        targetAudiences: course.targetAudiences,
      });

      toast({
        title: "Success",
        description: "Course settings have been updated",
      });

      setIsEdit(false);

      router.refresh();
    } catch (error) {
      console.error({ error });
    }
  };

  const handleChangeCourseStatus = async () => {
    try {
      await courseApi.updateCourse(course.id, {
        isPublic,
        status: COURSE_STATUS.PENDING,
        objectives: course.objectives,
        price: course.price,
        targetAudiences: course.targetAudiences,
      });

      toast({
        title: "Success",
        description: "Course status has been changed",
      });

      router.refresh();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div>
      <div className="flex-between h-9">
        <h2 className="text-xl font-semibold text-secondary-foreground">
          Cài đặt khóa học
        </h2>
      </div>

      <Separator className="my-5" />

      <div className="space-y-5">
        <div className="space-y-3">
          <Label className="text-lg text-black">Trạng thái</Label>

          <div>
            <span className="text-base capitalize">
              <Status status={course.status} /> -{" "}
            </span>

            {(() => {
              switch (course.status) {
                case COURSE_STATUS.DRAFT:
                  return (
                    <div className="inline-flex gap-5">
                      <span className="inline-flex items-center gap-2">
                        Khóa học đang ở trạng thái nháp, hoàn thành các thông
                        tin của khóa học để được quản trị viên duyệt
                      </span>

                      {completion === 100 && (
                        <Button
                          variant="secondary"
                          className="px-3"
                          onClick={handleChangeCourseStatus}
                        ></Button>
                      )}
                    </div>
                  );
                case COURSE_STATUS.PENDING:
                  return (
                    <span className="inline-flex items-center gap-2">
                      Khóa học chưa được duyệt và đang chờ duyệt từ quản trị
                      viên
                      <RefreshCwIcon size={16} color="orange" />
                    </span>
                  );
                case COURSE_STATUS.APPROVED:
                  return (
                    <span className="inline-flex items-center gap-2">
                      Khóa học đã được duyệt và hiện đang hoạt động
                      <CheckCircleIcon size={16} color="green" />
                    </span>
                  );

                case COURSE_STATUS.REJECTED:
                  return (
                    <span className="inline-flex items-center gap-2">
                      Khóa học đã bị từ chối
                      <XCircleIcon size={16} color="red" />
                    </span>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-lg text-black">Hiển thị</Label>
          <Select
            defaultValue={isPublic ? "Public" : "Private"}
            onValueChange={(value) => setIsPublic(value === "Public")}
          >
            <SelectTrigger className="w-1/4">
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Public">Công khai</SelectItem>
              <SelectItem value="Private">Riêng tư</SelectItem>
            </SelectContent>
          </Select>
          <p>
            {isPublic
              ? "Khóa học sẽ được hiển thị công khai"
              : "Khóa học sẽ được hiển thị riêng tư"}
          </p>
          <Button disabled={!isEdit} onClick={handleSave}>
            Save
          </Button>
        </div>

        {/* <Separator />

        <div className="flex items-center gap-5">
          <Button variant="secondary" className="min-w-36">
            Delete
          </Button>
          <p>
            Once you delete this course, it will be gone forever. Please be
            careful.
          </p>
        </div> */}
      </div>
    </div>
  );
};
export default CourseSetting;
