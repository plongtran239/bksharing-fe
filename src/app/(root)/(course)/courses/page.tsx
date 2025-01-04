import { Metadata } from "next";

import Categories from "@/app/(root)/(course)/courses/components/categories";
import MyCourses from "@/app/(root)/(course)/courses/components/my-courses";
import PopularCourses from "@/app/(root)/(course)/courses/components/popular-courses";
import Welcome from "@/app/(root)/(course)/courses/components/welcome";

export const metadata: Metadata = {
  title: "Courses | BK Sharing",
  description: "Find courses to help you grow your career.",
};

const Course = () => {
  return (
    <main className="pb-5">
      <div className="bg-secondary">
        <Welcome />
      </div>

      <section className="container space-y-5 py-5">
        <Categories />

        <MyCourses />

        <PopularCourses />
      </section>
    </main>
  );
};
export default Course;
