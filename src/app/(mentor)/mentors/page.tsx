import * as motion from "framer-motion/client";
import { Metadata } from "next";

import AnimationWrapper from "@/animation-wrapper";
import MentorCard from "@/app/(mentor)/mentors/components/mentor-card";
import SearchFilter from "@/app/(mentor)/mentors/components/search-filter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

const Mentor = () => {
  return (
    <main className="pb-10">
      {/* Search & Filter */}
      <AnimationWrapper>
        <div className="bg-secondary py-10">
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
        <div className="container mt-5">
          {/* Mentor List */}
          <p className="text-lg font-semibold">Mentors (8)</p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={parent}
            className="mt-5 grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:px-10"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((mentor, index) => (
              <motion.div variants={child} key={index}>
                <MentorCard />
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
