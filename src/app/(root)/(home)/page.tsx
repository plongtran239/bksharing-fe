import { CalendarRangeIcon, ReceiptTextIcon, UsersIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Card from "@/app/(root)/(home)/components/card";
import AnimationWrapper from "@/components/animation-wrapper";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "BK Sharing",
  description:
    "BK Sharing is an online platform connecting mentors and learners",
};

export default function Home() {
  return (
    <main className="max-lg:text-center">
      {/* Section 1 */}
      <AnimationWrapper
        animationProps={{
          transition: {
            delay: 0,
          },
        }}
      >
        <section className="bg-secondary">
          <div className="flex-between container py-20 max-lg:px-5 max-lg:py-10 lg:gap-10">
            <AnimationWrapper
              animationProps={{
                initial: {
                  opacity: 0,
                  x: -100,
                },
                transition: {
                  delay: 0.2,
                },
              }}
            >
              <div className="lg:flex-1">
                <div className="flex-center">
                  <h2 className="text-3xl font-semibold leading-normal text-secondary-foreground dark:text-primary max-lg:w-4/5 max-sm:w-full">
                    BK Sharing - Online Platform Connecting Mentors And Learners
                  </h2>
                </div>
                <div className="flex-center">
                  <p className="mt-4 text-justify text-lg leading-normal dark:text-white max-lg:w-4/5 max-lg:text-center max-sm:w-full lg:pr-10">
                    We provide a platform for mentors to share their knowledge
                    and experience with learners who are eager to learn.
                  </p>
                </div>

                <Link href={"/mentors"}>
                  <Button className="mt-4">Start Exploring</Button>
                </Link>
              </div>
            </AnimationWrapper>

            <AnimationWrapper
              animationProps={{
                initial: {
                  opacity: 0,
                  x: 100,
                },
                transition: {
                  delay: 0.2,
                },
              }}
            >
              <div className="relative h-[300px] w-[500px] max-lg:hidden">
                <Image
                  src="/images/landing-1.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw,"
                />
              </div>
            </AnimationWrapper>
          </div>
        </section>
      </AnimationWrapper>

      {/* Section 2 */}
      <AnimationWrapper
        animationProps={{
          transition: {
            delay: 0.4,
          },
        }}
      >
        <section className="container py-20 max-lg:px-5 max-lg:py-10">
          <div className="flex-center flex-col">
            <h2 className="max-sm:flex-center text-3xl max-sm:flex-col">
              <span className="text-secondary-foreground dark:text-white">
                All-In-One{" "}
              </span>
              <span className="text-primary">Cloud Software</span>
            </h2>
            <p className="mt-4 w-1/2 text-center dark:text-white max-lg:w-4/5 max-sm:w-full">
              BK Sharing is one powerful online software suite that combines all
              the tools needed to run a successful school or office.
            </p>
          </div>

          <ul className="mt-20 grid grid-cols-3 gap-10 max-lg:grid-cols-1 max-lg:gap-20">
            <li className="flex-center">
              <Card
                icon={<ReceiptTextIcon size={25} className="text-white" />}
                backgroundIcon="bg-icon-1"
                heading="Online Billing, Invoicing, & Contracts"
                content="Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts"
              />
            </li>

            <li className="flex-center">
              <Card
                icon={<CalendarRangeIcon size={25} className="text-white" />}
                backgroundIcon="bg-icon-2"
                heading="Easy Scheduling & Attendance Tracking"
                content="Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance"
              />
            </li>

            <li className="flex-center">
              <Card
                icon={<UsersIcon size={25} className="text-white" />}
                backgroundIcon="bg-icon-3"
                heading="Mentors & Learners Management"
                content="Manage student and staff information, contact details, attendance, and performance records"
              />
            </li>
          </ul>
        </section>
      </AnimationWrapper>

      {/* Section 3 */}
      <AnimationWrapper
        animationProps={{
          transition: {
            delay: 0.6,
          },
        }}
      >
        <section className="bg-secondary">
          <div className="container py-20 max-lg:px-5 max-lg:py-10">
            <div className="flex-center flex-col">
              <h2 className="text-3xl">
                <span className="text-secondary-foreground dark:text-white">
                  What is{" "}
                </span>
                <span className="text-primary">BK Sharing?</span>
              </h2>
              <p className="mt-4 w-1/2 text-center text-[#696984] dark:text-white max-lg:w-4/5 max-sm:w-full">
                BK Sharing is a platform that allows educators to create online
                classes whereby they can store the course materials online;
                manage assignments, quizzes and exams; monitor due dates; grade
                results and provide students with feedback all in one place.
              </p>
            </div>

            <ul className="flex-center mt-10 gap-10 max-sm:flex-col">
              <li className="flex-center h-[400px] w-full flex-col gap-2 rounded-3xl bg-black/40 bg-[url('/images/landing-2.png')] bg-blend-darken">
                <span className="text-xl font-semibold text-white">
                  FOR MENTORS
                </span>
                <Link href={"/mentor/courses"}>
                  <Button
                    className="rounded-full border-white bg-white/0 text-white"
                    variant="outline"
                  >
                    Become a mentor
                  </Button>
                </Link>
              </li>
              <li className="flex-center h-[400px] w-full flex-col gap-2 rounded-3xl bg-black/40 bg-[url('/images/landing-3.png')] bg-blend-darken">
                <span className="text-xl font-semibold text-white">
                  FOR LEARNERS
                </span>
                <Link href={"/mentors"}>
                  <Button variant="default" className="rounded-full opacity-95">
                    Find a mentor
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </AnimationWrapper>
    </main>
  );
}
