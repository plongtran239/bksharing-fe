"use client";

import CourseCard from "@/app/(root)/(course)/courses/components/course-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CourseType } from "@/schemas";

const CourseList = ({
  courses,
  isLearned,
}: {
  courses: CourseType[];
  isLearned: boolean;
}) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-4">
        {courses.map((course) => (
          <CarouselItem key={course.id} className="basis-1/4 pl-4">
            <CourseCard course={course} isLearned={isLearned} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default CourseList;
