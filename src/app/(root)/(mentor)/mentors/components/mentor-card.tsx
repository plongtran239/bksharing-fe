import { CircleUserIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MentorCard = () => {
  return (
    <Link
      href="#"
      className="flex-center w-full flex-col rounded-xl border border-primary p-5 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="flex-center flex-col gap-4">
        <div className="relative h-40 w-40">
          <Image
            src="/images/default-user.png"
            alt="mentor avatar"
            fill
            sizes="(max-width: 640px) 100px,"
          />
        </div>

        <p className="text-xl font-semibold text-black">Tran Phuoc Long</p>

        <p className="line-clamp-4 text-center text-xs">
          Backend Developer at GeekUp 12 years of experience in software
          development
        </p>
      </div>

      {/* Free Schedule */}
      <div className="text mt-6 w-full rounded-lg bg-secondary p-2 text-center text-sm">
        <p>Free schedule: </p>
        <p className="font-semibold text-black">20:00, 22/09/2024</p>
      </div>

      {/*  */}
      <div className="flex-between mt-5 w-full px-2 text-sm text-secondary-foreground">
        <span className="flex-center gap-1">
          <CircleUserIcon size={16} />
          30 mentees
        </span>

        <span className="flex-center gap-1">
          <HeartIcon size={16} />
          1,1k
        </span>
      </div>
    </Link>
  );
};
export default MentorCard;
