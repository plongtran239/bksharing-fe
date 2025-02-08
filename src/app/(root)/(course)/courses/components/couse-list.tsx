"use client";

import CourseCard from "@/app/(root)/(course)/courses/components/course-card";
import { CourseType } from "@/schemas";

const CourseList = ({ courses }: { courses: CourseType[] }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} isLearned={false} />
      ))}
    </div>
  );
};
export default CourseList;
