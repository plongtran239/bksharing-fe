import { Metadata } from "next";

import MentorInfo from "@/app/(root)/(user)/users/[slug]/components/mentor-info";
import Profile from "@/app/(root)/(user)/users/[slug]/components/profile";
import StudentChatting from "@/app/(root)/(user)/users/[slug]/components/student-chatting";
import Suggestions from "@/app/(root)/(user)/users/[slug]/components/suggestions";
import { ROLES } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Profile | BK Sharing",
  description: "Your profile information",
};

const User = ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const { role } = useGetFromCookie(["role"]);

  return (
    <section className="bg-[#f4f2ee]">
      <div
        className={cn(
          "container grid grid-cols-4 gap-5 py-10 max-xl:w-full max-xl:flex-col max-sm:px-5"
        )}
      >
        {/* Profile */}
        <Profile slug={slug} />

        {role && role === ROLES.MENTOR ? <MentorInfo /> : <Suggestions />}
      </div>

      <StudentChatting />
    </section>
  );
};
export default User;
