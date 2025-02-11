import Profile from "@/app/(root)/(user)/student/profile/components/profile";
import Recommendation from "@/app/(root)/(user)/student/profile/components/recommendation";
import { cn } from "@/lib/utils";

const StudentProfilePage = () => {
  return (
    <section className="bg-[#f4f2ee]">
      <div
        className={cn(
          "container grid grid-cols-4 gap-5 py-10 max-xl:w-full max-xl:flex-col max-sm:px-5"
        )}
      >
        {/* Profile */}
        <Profile />

        {/* Recommendations */}
        <Recommendation />
      </div>
    </section>
  );
};
export default StudentProfilePage;
