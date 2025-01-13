import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import Image from "next/image";

import { FeedbackType } from "@/schemas/feedback.schema";

const FeedbackCard = ({ feedback }: { feedback: FeedbackType }) => {
  const renderRating = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <div key={star} className="cursor-pointer">
        {star <= feedback.courseRating ? (
          <StarFilledIcon className="h-3 w-3 text-yellow-500" />
        ) : (
          <StarIcon className="h-3 w-3 text-yellow-500" />
        )}
      </div>
    ));
  };

  const calculateDate = () => {
    const date = new Date(Number(feedback.updatedAt));

    const currentDate = new Date();
    const diff = currentDate.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  };

  return (
    <div className="space-y-5 rounded-lg border border-primary p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div className="relative h-10 w-10">
            <Image
              src={
                feedback.reviewer.thumbnail?.originalUrl ||
                "/images/default-user.png"
              }
              alt=""
              fill
              className="rounded-full"
            />
          </div>

          <div className="space-y-1">
            <div className="font-bold">{feedback.reviewer.name}</div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 text-sm">
                {renderRating()}
              </div>

              <p className="text-xs">{calculateDate()}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-black">{feedback.courseReview}</p>
    </div>
  );
};
export default FeedbackCard;
