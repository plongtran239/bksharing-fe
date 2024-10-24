import * as motion from "framer-motion/client";
import { Metadata } from "next";

import userApi from "@/apis/user.api";
import MentorCard from "@/app/(root)/(mentor)/mentors/components/mentor-card";
import SearchFilter from "@/app/(root)/(mentor)/mentors/components/search-filter";
import AnimationWrapper from "@/components/animation-wrapper";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

export const metadata: Metadata = {
  title: "Mentors | BK Sharing",
  description: "Find mentors to help you grow your career.",
};

const parent = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Mentor = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data: mentors },
  } = await userApi.getMentorList(sessionToken);

  return (
    <main className="pb-10">
      {/* Search & Filter */}
      <AnimationWrapper>
        <div className="bg-secondary py-10 max-sm:px-5">
          <div className="container">
            <SearchFilter />
          </div>
        </div>
      </AnimationWrapper>

      <AnimationWrapper
        animationProps={{
          initial: {
            opacity: 0,
            y: 15,
          },
          transition: {
            delay: 0,
          },
        }}
      >
        <div className="container mt-10">
          {/* Mentor List */}
          <p className="text-lg font-semibold max-sm:px-5">Mentors (8)</p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={parent}
            className="mt-10 grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:px-5"
          >
            {mentors.map((mentor, index) => (
              <motion.div variants={child} key={index}>
                <MentorCard data={mentor} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </AnimationWrapper>
    </main>
  );
};
export default Mentor;
