import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Metadata } from "next";

import categoryApi from "@/apis/category.api";
import courseApi from "@/apis/course.api";
import CategoryList from "@/app/(root)/(course)/courses/components/category-list";
import CourseCard from "@/app/(root)/(course)/courses/components/course-card";
import Welcome from "@/app/(root)/(course)/courses/components/welcome";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Courses | BK Sharing",
  description: "Find courses to help you grow your career.",
};

const Course = async () => {
  const {
    payload: { data: courses, total },
  } = await courseApi.getCourses();

  const {
    payload: { data: categories },
  } = await categoryApi.getCategories();

  return (
    <main>
      <div className="bg-secondary">
        <Welcome />
      </div>

      <section className="container space-y-5 py-5">
        <div className="">
          <CategoryList categories={categories} />
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-primary">
              Khóa Học Của Tôi
            </h2>
            <p className="text-sm text-gray-500">
              Tất cả khóa học bạn đã tham gia
            </p>
          </div>
          {/* My Courses */}
          <div className="flex gap-5">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-primary">
              Khóa Học Phổ Biến
            </h2>
            <p className="text-sm text-gray-500">
              Các khóa học được nhiều người tham gia nhất
            </p>
          </div>

          {/* Popular */}
          <div className="flex gap-5">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {total > 3 && (
          <div className="flex items-center justify-end gap-5">
            <Button className="flex-center gap-2 pl-4 pr-5" disabled>
              <ChevronLeftIcon size={16} />
              Previous
            </Button>

            <Button className="flex-center gap-2 pl-5 pr-4">
              Next
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};
export default Course;
