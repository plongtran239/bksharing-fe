import { CalendarRangeIcon, ReceiptTextIcon, UsersIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

import AnimationWrapper, { defaultAnimationProps } from "@/animation-wrapper";
import Card from "@/app/(home)/components/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Home | BK Sharing",
  description:
    "BK Sharing is an online platform connecting mentors and learners",
};

export default function Home() {
  return (
    <main>
      {/* Section 1 */}
      <AnimationWrapper>
        <section className="bg-secondary">
          <div className="flex-between container gap-10 py-10">
            <div className="flex-1">
              <h2 className="text-3xl font-semibold leading-normal text-secondary-foreground dark:text-primary">
                BK Sharing - Online Platform Connecting Mentors And Learners
              </h2>
              <p className="mt-4 pr-10 text-justify text-lg leading-normal dark:text-white">
                We provide a platform for mentors to share their knowledge and
                experience with learners who are eager to learn.
              </p>

              <Button className="mt-4">Start Exploring</Button>
            </div>

            <Image
              src="/images/landing-1.png"
              alt=""
              width={500}
              height={500}
              priority
            />
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
        <section className="container mt-32">
          <div className="flex-center flex-col">
            <h2 className="text-3xl">
              <span className="text-secondary-foreground dark:text-white">
                All-In-One{" "}
              </span>
              <span className="text-primary">Cloud Software</span>
            </h2>
            <p className="mt-4 w-1/2 text-center dark:text-white">
              BK Sharing is one powerful online software suite that combines all
              the tools needed to run a successful school or office.
            </p>
          </div>

          <ul className="flex-between mt-20 gap-12">
            <li className="flex-1">
              <Card
                icon={<ReceiptTextIcon size={25} className="text-white" />}
                backgroundIcon="icon-1"
                heading="Online Billing, Invoicing, & Contracts"
                content="Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts"
              />
            </li>
            <li className="flex-1">
              <Card
                icon={<CalendarRangeIcon size={25} className="text-white" />}
                backgroundIcon="icon-2"
                heading="Easy Scheduling & Attendance Tracking"
                content="Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance"
              />
            </li>
            <li className="flex-1">
              <Card
                icon={<UsersIcon size={25} className="text-white" />}
                backgroundIcon="icon-3"
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
        <section className="container my-32">
          <div className="flex-center flex-col">
            <h2 className="text-3xl">
              <span className="text-secondary-foreground dark:text-white">
                What is{" "}
              </span>
              <span className="text-primary">BK Sharing?</span>
            </h2>
            <p className="mt-4 w-1/2 text-center text-[#696984] dark:text-white">
              BK Sharing is a platform that allows educators to create online
              classes whereby they can store the course materials online; manage
              assignments, quizzes and exams; monitor due dates; grade results
              and provide students with feedback all in one place.
            </p>
          </div>

          <ul className="flex-center mt-20 gap-16">
            <li className="flex-center h-[400px] w-[600px] flex-col gap-2 rounded-3xl bg-black/40 bg-[url('/images/landing-2.png')] bg-blend-darken">
              <span className="text-xl font-semibold text-white">
                FOR MENTORS
              </span>
              <Button
                className="rounded-full border-white bg-white/0 text-white"
                variant="outline"
              >
                Become a mentor
              </Button>
            </li>
            <li className="flex-center h-[400px] w-[600px] flex-col gap-2 rounded-3xl bg-black/40 bg-[url('/images/landing-3.png')] bg-blend-darken">
              <span className="text-xl font-semibold text-white">
                FOR LEARNERS
              </span>
              <Button variant="default" className="rounded-full opacity-95">
                Enter a classron code
              </Button>
            </li>
          </ul>
        </section>
      </AnimationWrapper>
    </main>
  );
}
