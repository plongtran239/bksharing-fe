import { InboxIcon } from "lucide-react";

import feedbackApi from "@/apis/feedback.api";
import FeedbackCard from "@/app/(root)/(user)/users/[slug]/components/feedback-card";
import { REVIEW_TYPE } from "@/constants/enum";

const FeedbackTab = async ({ mentorId }: { mentorId: number }) => {
  let feedbacks = null;

  try {
    const {
      payload: { data },
    } = await feedbackApi.getFeedbacks({
      relationType: REVIEW_TYPE.MENTOR,
      relationId: mentorId,
    });

    feedbacks = data;
  } catch (error) {
    console.error({ error });
  }

  if (!feedbacks) {
    return <div>Failed to load feedbacks</div>;
  }

  if (feedbacks.length === 0) {
    return (
      <div className="flex-center flex-col gap-3 rounded-xl bg-white px-5 py-10">
        <InboxIcon size={24} className="" />
        <h2 className="font-semibold">No reviews yet</h2>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-5">
      <h2 className="text-2xl font-semibold text-primary">
        Reviews ({feedbacks.length})
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-5">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};
export default FeedbackTab;
