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

  const handleCalculateCourseCompletion = () => {
    const totalSections = 5;
    const sectionWeight = 100 / totalSections;

    const completedSections = [
      course.name,
      course.category,
      course.image?.fileId,
      course.objectives.length > 0,
      course.sections.length > 0,
    ].filter(Boolean).length;

    return completedSections * sectionWeight;
  };

  const completion = handleCalculateCourseCompletion();

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

      {completion < 100 && (
        <div className="mb-5 rounded-xl border border-yellow-200 bg-yellow-100 p-5 text-black">
          Complete the course information, content to ask for approval from the
          admin.
          <p>
            - Course Information: Course name, category, thumbnail and
            objectives.
          </p>
          <p>- Course Content: Add sections to your course.</p>
        </div>
      )}

      <Tabs defaultValue="info">
        <div className="flex-center">
          <TabsList>
            <TabsTrigger value="info">Course Information</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="setting">Course Settings</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-5">
          <TabsContent value="info">
            <CourseInfo course={course} />
          </TabsContent>

          <TabsContent value="content">
            <CourseContent course={course} />
          </TabsContent>

          <TabsContent value="setting">
            <CourseSetting course={course} />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};
export default CourseDetail;
