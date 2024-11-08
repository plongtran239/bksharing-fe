import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Metadata } from "next";

import CourseCard from "@/app/(root)/(course)/courses/components/course-card";
import Welcome from "@/app/(root)/(course)/courses/components/welcome";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Courses | BK Sharing",
  description: "Find courses to help you grow your career.",
};

const Course = () => {
  return (
    <main>
      <div className="bg-secondary">
        <Welcome />
      </div>

      {/* Recommandation */}
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
    </main>
  );
};
export default Course;
