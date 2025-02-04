"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import recommandationApi from "@/apis/recommandation.api";
import { Separator } from "@/components/ui/separator";
import { ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";
import { MentorDTOType } from "@/schemas/recommandation.schema";

const Suggestions = () => {
  const { user } = useAppContext();

  const [suggestions, setSuggestions] = useState<MentorDTOType[]>();

  useEffect(() => {
    async function fetchSuggestions() {
      if (!user) {
        return;
      }

      if (user.accountType === ROLES.MENTOR) {
        return;
      }

      try {
        const {
          payload: { recommendations },
        } = await recommandationApi.getMentorRecommandations(user.id);

        const accountIds = recommendations.map((item) => item.account_id);

        const {
          payload: { data },
        } = await recommandationApi.getMentorsByIds(accountIds);

        setSuggestions(data.mentorsDTO);
      } catch (error) {
        console.error({ error });
      }
    }

    fetchSuggestions();
  }, [user]);

  if (user && user.accountType === ROLES.MENTOR) {
    return null;
  }

  if (!suggestions) {
    return null;
  }

  return (
    <div className="col-auto h-fit rounded-xl bg-white p-5 max-xl:w-full max-xl:px-5">
      <p className="text-lg font-semibold">Có thể bạn quan tâm</p>

      {suggestions.map((mentor) => (
        <div key={mentor.id} className="">
          <Separator className="my-3" />
          <div>
            <div className="flex items-center gap-5">
              <div className="relative h-8 w-8">
                <Image
                  src={
                    mentor.thumbnail?.originalUrl || "/images/default-user.png"
                  }
                  alt="Avatar"
                  fill
                  className="rounded-full"
                  sizes="(max-width: 640px) 100px,"
                />
              </div>

              <div className="w-2/3">
                <p className="font-semibold">{mentor.name}</p>
                <span className="font line-clamp-2 text-sm text-[#5B5B5B]">
                  {mentor.bio}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Suggestions;
