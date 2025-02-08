"use client";

import { useEffect, useState } from "react";

import recommandationApi from "@/apis/recommandation.api";
import SuggestionCard from "@/app/(root)/(user)/users/[slug]/components/suggestion-card";
import { Separator } from "@/components/ui/separator";
import { ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";
import { MentorDTOType } from "@/schemas/recommandation.schema";

const MentorRecommendations = () => {
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
        } = await recommandationApi.getContentBasedMentorRecommandations(
          user.id
        );

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
      <p className="text-xl font-semibold text-primary">
        Gia sư phù hợp với bạn
      </p>

      {suggestions.map((mentor) => (
        <div key={mentor.id} className="">
          <Separator className="my-3" />
          <SuggestionCard mentor={mentor} />
        </div>
      ))}
    </div>
  );
};
export default MentorRecommendations;
