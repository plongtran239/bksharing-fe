import { PlusIcon } from "lucide-react";
import Link from "next/link";

import CourseList from "@/app/(mentor)/mentor/courses/components/course-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MentorCourse = async () => {
  return (
    <section>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Courses</h1>

        <Link href="/course/create">
          <Button className="flex-center gap-2">
            <PlusIcon size={16} />
            Create New Course
          </Button>
        </Link>
      </div>

      <Separator className="my-5" />

      <CourseList />
    </section>
  );
};
export default MentorCourse;
