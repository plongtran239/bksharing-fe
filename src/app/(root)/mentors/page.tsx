import { Metadata } from "next";

import userApi from "@/apis/user.api";
import MentorCard from "@/app/(root)/mentors/components/mentor-card";
import MentorRecommendations from "@/app/(root)/mentors/components/mentor-recommendations";
import SearchFilter from "@/app/(root)/mentors/components/search-filter";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentors | BK Sharing",
  description: "Find mentors to help you grow your career.",
};

interface MentorProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const Mentor = async ({ searchParams }: MentorProps) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const pageNumber = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 12;
  const name = searchParams.name;
  const sortOrder = searchParams.sortOrder;

  const {
    payload: { data: mentors, total },
  } = await userApi.getMentorList({ pageNumber, pageSize, name, sortOrder });

  return (
    <main className="pb-10">
      {/* Search & Filter */}
      <div className="bg-secondary py-10 max-sm:px-5">
        <div className="container">
          <SearchFilter />
        </div>
      </div>

      <div className="container mt-5 grid grid-cols-4 gap-5">
        <div
          className={cn("col-span-3 mt-5", {
            "col-span-4": !sessionToken,
          })}
        >
          {total === 0 ? (
            <div className="min-h-[184px]">Không tìm thấy gia sư phù hợp.</div>
          ) : (
            <div
              className={cn(
                "grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:px-5",
                {
                  "grid-cols-4": !sessionToken,
                }
              )}
            >
              {mentors.map((mentor, index) => (
                <div key={index}>
                  <MentorCard data={mentor} />
                </div>
              ))}
            </div>
          )}
        </div>

        {sessionToken && <MentorRecommendations />}
      </div>

      {total > 12 && (
        <div className="mt-10">
          <PaginationWithLinks
            page={pageNumber}
            pageSize={pageSize}
            totalCount={total}
          />
        </div>
      )}
    </main>
  );
};
export default Mentor;
