import { Metadata } from "next";

import Courses from "@/app/(root)/(course)/courses/components/courses";
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
        <Courses />
      </section>
    </main>
  );
};
export default Course;
