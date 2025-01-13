import { StarFilledIcon } from "@radix-ui/react-icons";
import { ChevronsUpDownIcon } from "lucide-react";

import feedbackApi from "@/apis/feedback.api";
import FeedbackCard from "@/app/(admin)/admin/courses/[nameId]/components/feedback-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { REVIEW_TYPE } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const CourseFeedbacks = async ({ courseId }: { courseId: number }) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await feedbackApi.getAdminFeedbacks(sessionToken, {
    relationType: REVIEW_TYPE.COURSE,
    relationId: courseId,
  });

  const caculateRating = () => {
    if (data.length === 0) {
      return 0;
    }

    const totalRating = data.reduce(
      (acc, feedback) => acc + feedback.courseRating,
      0
    );

    return (totalRating / data.length).toFixed(1);
  };

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex-between w-full rounded-lg px-2 hover:bg-secondary">
        <div className="flex items-center gap-2">
          <p className="flex-center gap-1 text-lg font-semibold text-secondary-foreground">
            {caculateRating()}
            <StarFilledIcon className="h-5 w-5 text-yellow-500" />
          </p>
          <div className="h-1 w-1 rounded-full bg-primary"></div>
          <p className="text-lg font-semibold text-secondary-foreground">
            {data.length} đánh giá
          </p>
        </div>

        <ChevronsUpDownIcon size={16} className="text-secondary-foreground" />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {data.map((feedback) => (
            <FeedbackCard feedback={feedback} key={feedback.id} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
export default CourseFeedbacks;
