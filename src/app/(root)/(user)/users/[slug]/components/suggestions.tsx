"use client";

import { useEffect, useState } from "react";

import recommandationApi from "@/apis/recommandation.api";
import SuggestionCard from "@/app/(root)/(user)/users/[slug]/components/suggestion-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";
import { MentorDTOType } from "@/schemas/recommandation.schema";

const Suggestions = () => {
  const { user } = useAppContext();

  const [suggestions, setSuggestions] = useState<MentorDTOType[]>();

  const [showMore, setShowMore] = useState(false);

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
        } = await recommandationApi.getCollaborativeMentorRecommandations(
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

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  if (user && user.accountType === ROLES.MENTOR) {
    return null;
  }

  if (!suggestions) {
    return null;
  }

  return (
    <div className="col-auto h-fit rounded-xl bg-white p-5 max-xl:w-full max-xl:px-5">
      <p className="text-lg font-semibold">Có thể bạn quan tâm</p>

      {showMore
        ? suggestions.map((mentor) => (
            <div key={mentor.id} className="">
              <Separator className="my-3" />
              <SuggestionCard mentor={mentor} />
            </div>
          ))
        : suggestions.slice(0, 5).map((mentor) => (
            <div key={mentor.id} className="">
              <Separator className="my-3" />
              <SuggestionCard mentor={mentor} />
            </div>
          ))}

      <Separator className="my-3" />

      <div className="flex-center">
        <Button variant="link" onClick={handleShowMore}>
          {showMore ? "Thu gọn" : "Xem thêm"}
        </Button>
      </div>
    </div>
  );
};
export default Suggestions;
