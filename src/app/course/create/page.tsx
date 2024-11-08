import { Metadata } from "next";

import CreateCourse from "@/app/course/create/components/create-course";

export const metadata: Metadata = {
  title: "Create Course | BK Sharing",
  description: "Create course page",
};

const CreateCoursePage = () => {
  return <CreateCourse />;
};
export default CreateCoursePage;
