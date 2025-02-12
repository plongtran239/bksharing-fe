"use client";

import { useState } from "react";

import CourseContent from "@/app/(mentor)/mentor/courses/[nameId]/components/course-content";
import CourseInfo from "@/app/(mentor)/mentor/courses/[nameId]/components/course-info";
import CourseSetting from "@/app/(mentor)/mentor/courses/[nameId]/components/course-setting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseDetailType } from "@/schemas";

const CourseTab = ({ course }: { course: CourseDetailType }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Tabs
      defaultValue="info"
      onValueChange={() => {
        if (isEdit) {
          setIsEdit(false);
        }
      }}
    >
      <div className="flex-center flex-col">
        <TabsList defaultValue="info">
          <TabsTrigger value="info">Thông tin</TabsTrigger>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
          <TabsTrigger value="setting">Cài đặt</TabsTrigger>
        </TabsList>
        <p className="mt-1 text-sm">
          {isEdit &&
            "Bạn đang chỉnh sửa khóa học. Đừng quên lưu thay đổi của bạn."}
        </p>
      </div>

      <div className="mt-5">
        <TabsContent value="info">
          <CourseInfo course={course} isEdit={isEdit} setIsEdit={setIsEdit} />
        </TabsContent>

        <TabsContent value="content">
          <CourseContent
            course={course}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </TabsContent>

        <TabsContent value="setting">
          <CourseSetting
            course={course}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
export default CourseTab;
