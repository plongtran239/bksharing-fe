import { StarFilledIcon } from "@radix-ui/react-icons";
import { CircleUserRoundIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { generateNameId } from "@/lib/utils";
import { MentorType } from "@/schemas";

const MentorCard = ({ data }: { data: MentorType }) => {
  const { name, thumbnail, id, bio } = data;

  return (
    <Link
      href={`/users/${generateNameId({
        name,
        id,
      })}`}
      className="flex-between min-h-[300px] w-full flex-col rounded-xl border border-primary p-5 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="flex-center flex-col gap-4">
        <div className="relative h-40 w-40">
          <Image
            src={thumbnail?.originalUrl || "/images/default-user.png"}
            alt="mentor avatar"
            fill
            sizes="(max-width: 640px) 100px,"
            className="rounded-full shadow-xl"
            priority
          />
        </div>

        <p className="text-xl font-semibold text-black">{name}</p>

        <div className="w-full rounded-md bg-secondary p-2 text-center text-xs text-secondary-foreground">
          <p className="line-clamp-2">{bio || "Không có mô tả"}</p>
        </div>
      </div>

      <div className="w-full text-center text-sm">
        <div className="flex-between mt-5 w-full text-sm text-primary">
          <div className="flex-center gap-1">
            <CircleUserRoundIcon size={16} />
            <span className="text-black">
              {data.noOfSubscriptions} lượt đăng ký
            </span>
          </div>

          <div className="flex-center gap-1">
            <span className="text-black">{data.rateOfMentor.toFixed(1)}</span>
            <StarFilledIcon className="text-yellow-400" />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default MentorCard;
