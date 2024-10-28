import Image from "next/image";

import { Progress } from "@/components/ui/progress";

const CourseHistoryCard = () => {
  return (
    <div className="space-y-5 rounded-xl bg-white p-5 transition-all hover:scale-105 hover:shadow-2xl">
      <div className="relative h-[12rem] w-full">
        <Image src="/images/landing-1.png" alt="" fill />
      </div>

      <p className="text-black">AWS Certified Solutions Architect</p>

      <Progress value={60} />

      <p className="mt-5 text-right text-sm">Lesson 5 of 7</p>
    </div>
  );
};
export default CourseHistoryCard;
