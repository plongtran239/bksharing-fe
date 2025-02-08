"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { CircleUserRoundIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { generateNameId } from "@/lib/utils";
import { MentorDTOType } from "@/schemas/recommandation.schema";

const SuggestionCard = ({ mentor }: { mentor: MentorDTOType }) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer"
      onClick={() =>
        router.replace(
          `/users/${generateNameId({
            name: mentor.name,
            id: mentor.id,
          })}`
        )
      }
    >
      <div className="flex items-center gap-5">
        <div className="relative h-8 w-8">
          <Image
            src={mentor.thumbnail?.originalUrl || "/images/default-user.png"}
            alt="Avatar"
            fill
            className="rounded-full"
            sizes="(max-width: 640px) 100px,"
          />
        </div>

        <div className="flex-1">
          <p className="font-semibold">{mentor.name}</p>
          <span className="font line-clamp-2 text-xs text-[#5B5B5B]">
            {mentor.bio}
          </span>
        </div>
      </div>

      <div className="flex-between mt-2 w-full px-2 text-sm text-primary">
        <div className="flex-center gap-1">
          <CircleUserRoundIcon size={16} />
          <span className="text-black">
            {mentor.noOfSubscriptions} lượt đăng ký
          </span>
        </div>

        <div className="flex-center gap-1">
          <span className="text-black">{mentor.rateOfMentor.toFixed(1)}</span>
          <StarFilledIcon className="text-yellow-400" />
        </div>
      </div>
    </div>
  );
};
export default SuggestionCard;
