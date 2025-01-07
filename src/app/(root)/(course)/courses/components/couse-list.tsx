"use client";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

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
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
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
