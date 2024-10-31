import { CourseDetailType } from "@/schemas";

const CourseContent = ({ course }: { course: CourseDetailType }) => {
  console.log({ course });

  return <div>CourseContent</div>;
};
export default CourseContent;
