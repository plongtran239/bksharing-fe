import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Metadata } from "next";

import CategoryCard from "@/app/(root)/(course)/courses/components/category-card";
import CourseCard from "@/app/(root)/(course)/courses/components/course-card";
import CourseHistoryCard from "@/app/(root)/(course)/courses/components/course-history-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Courses | BK Sharing",
  description: "Find courses to help you grow your career.",
};

const Course = () => {
  return (
    <main>
      {/* Learning History */}
      <div className="bg-secondary">
        <section className="container space-y-10 py-10">
          <div className="flex-between">
            <p className="text-2xl font-semibold text-black">
              Welcome back, ready for next lesson?
            </p>
            <p className="font-semibold text-primary">view history</p>
          </div>

          <div className="grid grid-cols-3 gap-10">
            {[1, 2, 3].map((item) => (
              <CourseHistoryCard key={item} />
            ))}
          </div>

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
        </section>
      </div>

      {/* Favourite Category */}
      <section className="container space-y-10 py-10">
        <p className="text-2xl font-semibold text-black">
          Choice favourite course from top category
        </p>

        <div className="grid grid-cols-4 gap-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <CategoryCard key={item} />
          ))}
        </div>
      </section>

      {/* Recommandation */}
      <div className="bg-secondary">
        <section className="container space-y-10 py-10">
          <p className="text-2xl font-semibold text-black">Courses</p>

          <div className="grid grid-cols-3 gap-10">
            {[1, 2, 3].map((item) => (
              <CourseCard key={item} />
            ))}
          </div>

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
        </section>
      </div>
    </main>
  );
};
export default Course;
