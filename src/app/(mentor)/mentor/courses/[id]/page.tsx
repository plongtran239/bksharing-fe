import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import courseApi from "@/apis/course.api";
import CourseContent from "@/app/(mentor)/mentor/courses/[id]/components/course-content";
import CourseInfo from "@/app/(mentor)/mentor/courses/[id]/components/course-info";
import CourseSetting from "@/app/(mentor)/mentor/courses/[id]/components/course-setting";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const CourseDetail = async ({ params: { id } }: { params: { id: number } }) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  let course = null;

  if (sessionToken) {
    try {
      const {
        payload: { data },
      } = await courseApi.getCourseById(sessionToken, id);

      course = data;
    } catch (error) {
      console.error(error);
    }
  }

  if (!course) {
    notFound();
  }

  return (
    <section>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Courses</h1>

        <Link href="/mentor/courses">
          <Button className="flex-center gap-2">
            <ChevronLeftIcon size={16} />
            Back to Courses
          </Button>
        </Link>
      </div>

      <Separator className="my-5" />

      <Tabs defaultValue="info">
        <div className="flex-center">
          <TabsList>
            <TabsTrigger value="info">Course Information</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="setting">Course Setting</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-5">
          <TabsContent value="info">
            <CourseInfo course={course} />
          </TabsContent>

          <TabsContent value="content">
            <CourseContent />
          </TabsContent>

          <TabsContent value="setting">
            <CourseSetting />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};
export default CourseDetail;
