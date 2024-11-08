import { Clock12Icon, Grid2X2Icon } from "lucide-react";
import Image from "next/image";

const CourseCard = () => {
  return (
    <div className="space-y-5 rounded-xl border border-primary bg-white p-5 shadow-2xl transition-all hover:scale-105">
      <div className="relative h-[12rem] w-full">
        <Image src="/images/landing-1.png" alt="" fill />
      </div>

      <div className="flex-between">
        <div className="flex-center gap-1">
          <Grid2X2Icon size={16} />
          <p className="text-sm">Design</p>
        </div>

        <div className="flex-center gap-1">
          <Clock12Icon size={16} />
          <p className="text-sm">2h30m</p>
        </div>
      </div>

      <p className="text-black">AWS Certified Solutions Architect</p>

      <p className="line-clamp-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        neque earum temporibus porro obcaecati. Nostrum aliquid, error facere
        culpa eveniet a voluptatibus, veniam sint, repellat amet praesentium
        harum saepe recusandae!
      </p>

      <div className="flex-between">
        <div className="flex-center gap-2 text-sm">
          <div className="relative h-5 w-5 rounded-full">
            <Image src="/images/default-user.png" alt="" fill />
          </div>
          <p>Long Tran</p>
        </div>

        <p className="font-semibold text-primary">80$</p>
      </div>
    </div>
  );
};
export default CourseCard;
