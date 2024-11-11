"use client";

import { CheckCircleIcon, RefreshCwIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import courseApi from "@/apis/course.api";
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

  const handleSave = async () => {
    try {
      await courseApi.updateCourse(course.id, {
        isPublic,
        courseType: course.courseType,
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

  return (
    <div>
      <div className="flex-between h-9">
        <h2 className="text-xl font-semibold text-secondary-foreground">
          Settings
        </h2>
      </div>

      <Separator className="my-5" />

      <div className="space-y-5">
        <div className="space-y-3">
          <Label className="text-lg text-black">Course Status</Label>

          <div>
            <span className="text-base capitalize">
              {course.status.toLowerCase()} -{" "}
            </span>

            {(() => {
              switch (course.status) {
                case COURSE_STATUS.DRAFT:
                  return (
                    <span className="inline-flex items-center gap-2">
                      This course is a draft and not published yet
                      {/* <XCircleIcon size={16} color="red" /> */}
                    </span>
                  );
                case COURSE_STATUS.PENDING:
                  return (
                    <span className="inline-flex items-center gap-2">
                      This course is not approved and waiting for approval from
                      the admin
                      <RefreshCwIcon size={16} color="orange" />
                    </span>
                  );
                case COURSE_STATUS.APPROVED:
                  return (
                    <span className="inline-flex items-center gap-2">
                      This course is approved and published
                      <CheckCircleIcon size={16} color="green" />
                    </span>
                  );

                case COURSE_STATUS.REJECTED:
                  return (
                    <span className="inline-flex items-center gap-2">
                      This course is rejected by the admin
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
          <Label className="text-lg text-black">Visibility</Label>
          <Select
            defaultValue={isPublic ? "Public" : "Private"}
            onValueChange={(value) => setIsPublic(value === "Public")}
          >
            <SelectTrigger className="w-1/4">
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Public">Public</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
            </SelectContent>
          </Select>
          <p>
            {isPublic
              ? "This course is visible to everyone."
              : "This course is only visible to you and your students."}
          </p>
          <Button disabled={!isEdit} onClick={handleSave}>
            Save
          </Button>
        </div>

        <Separator />

        <div className="flex items-center gap-5">
          <Button variant="secondary" className="min-w-36">
            Delete
          </Button>
          <p>
            Once you delete this course, it will be gone forever. Please be
            careful.
          </p>
        </div>
      </div>
    </div>
  );
};
export default CourseSetting;
