"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import recommandationApi from "@/apis/recommandation.api";
import SuggestionCard from "@/app/(root)/(user)/users/[slug]/components/suggestion-card";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";
import { MentorDTOType } from "@/schemas/recommandation.schema";

const MentorRecommendations = () => {
  const { user } = useAppContext();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, [user]);

  if (user && user.accountType === ROLES.MENTOR) {
    return null;
  }

  return (
    <div className="col-auto h-fit rounded-xl bg-white p-5 max-xl:w-full max-xl:px-5">
      <p className="text-xl font-semibold text-primary">
        Gia sư phù hợp với bạn
      </p>

      {loading && (
        <div className="mt-5">
          <Loader />
        </div>
      )}

      {suggestions &&
        suggestions.map((mentor) => (
          <div key={mentor.id} className="">
            <Separator className="my-3" />
            <SuggestionCard mentor={mentor} />
          </div>
        ))}

      <Separator className="my-3" />

      <div className="flex-center flex-col space-y-3">
        <p className="text-center">
          Cập nhật hồ sơ để được đề xuất phù hợp hơn
        </p>
        <Button onClick={() => router.push("/student/profile")}>
          Cập nhật
        </Button>
      </div>
    </div>
  );
};
export default MentorRecommendations;
