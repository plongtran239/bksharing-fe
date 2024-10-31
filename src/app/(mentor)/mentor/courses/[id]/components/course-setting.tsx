"use client";

import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

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
import { CourseDetailType } from "@/schemas";

const CourseSetting = ({ course }: { course: CourseDetailType }) => {
  const [isPublic, setIsPublic] = useState(course.isPublic);

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
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div>
      <div className="flex-between">
        <h2 className="text-xl text-secondary-foreground">Settings</h2>
      </div>

      <Separator className="my-5" />

      <div className="space-y-5">
        <div>
          <Label className="text-lg text-black">Course Status</Label>
          {course.isApproved ? (
            <div className="flex items-center gap-2">
              This course is approved and published
              <CheckCircleIcon size={16} color="green" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              This course is not approved and waiting for approval from the
              admin
              <XCircleIcon size={16} color="red" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          <Button variant="secondary" className="min-w-36">
            Delete
          </Button>
          <p>
            Once you delete this course, it will be gone forever. Please be
            careful.
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
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
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
export default CourseSetting;
