// import { CircleUserIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MentorType } from "@/schemas";

const MentorCard = ({ data }: { data: MentorType }) => {
  const { name, thumbnail, id, bio } = data;

  return (
    <Link
      href={`/users/${id}`}
      // className="flex-between min-h-[420px] w-full flex-col rounded-xl border border-primary p-5 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
      className="flex-between min-h-[300px] w-full flex-col rounded-xl border border-primary p-5 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="flex-center flex-col gap-4">
        <div className="relative h-40 w-40">
          <Image
            src={thumbnail?.originalUrl || "/images/default-user.png"}
            alt="mentor avatar"
            fill
            sizes="(max-width: 640px) 100px,"
            className="rounded-full"
            priority
          />
        </div>

        <p className="text-xl font-semibold text-black">{name}</p>

        <p className="line-clamp-2 text-center text-xs">{bio || "No bio"}</p>
      </div>

      {/* Free Schedule */}
      {/* <div className="w-full text-center text-sm">
        <div className="rounded-lg bg-secondary p-2">
          <p>Free schedule: </p>
          <p className="font-semibold text-black">20:00, 22/09/2024</p>
        </div>

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
      </div> */}
    </Link>
  );
};
export default MentorCard;
