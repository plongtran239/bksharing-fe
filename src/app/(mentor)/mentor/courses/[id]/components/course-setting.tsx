import { Button } from "@/components/ui/button";

const CourseSetting = () => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">Course Status</h2>
        <p className="text-sm">This course is not published</p>
      </div>

      <div className="flex items-center gap-5">
        <Button variant="secondary" className="min-w-36">
          Publish
        </Button>
        <p>Student can find your course via search and enroll in it.</p>
      </div>

      <div className="flex items-center gap-5">
        <Button variant="secondary" className="min-w-36">
          Delete
        </Button>
        <p>
          Once you delete this course, it will be gone forever. Please be
          careful.
        </p>
      </div>
    </div>
  );
};
export default CourseSetting;
