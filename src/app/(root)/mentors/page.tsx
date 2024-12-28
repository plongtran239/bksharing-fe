import { Metadata } from "next";

import userApi from "@/apis/user.api";
import MentorCard from "@/app/(root)/mentors/components/mentor-card";
import SearchFilter from "@/app/(root)/mentors/components/search-filter";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

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
  const pageNumber = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 12;
  const name = searchParams.name;

  const {
    payload: { data: mentors, total },
  } = await userApi.getMentorList({ pageNumber, pageSize, name });

  return (
    <main className="pb-10">
      {/* Search & Filter */}
      <div className="bg-secondary py-10 max-sm:px-5">
        <div className="container">
          <SearchFilter />
        </div>
      </div>

      <div className="container mt-10">
        {/* Mentor List */}
        <p className="text-lg font-semibold max-sm:px-5">
          Gia sư ({mentors.length})
        </p>

        {total === 0 ? (
          <div className="mt-10 min-h-[184px]">No mentors found.</div>
        ) : (
          <div className="mt-10 grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:px-5">
            {mentors.map((mentor, index) => (
              <div key={index}>
                <MentorCard data={mentor} />
              </div>
            ))}
          </div>
        )}
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
