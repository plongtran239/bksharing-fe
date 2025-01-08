import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
  ReviewType,
  initialReview,
} from "@/app/(root)/subscriptions/components/card-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REVIEW_TYPE } from "@/constants/enum";

interface IProps {
  openReview: boolean;
  setOpenReview: Dispatch<SetStateAction<boolean>>;
  review: ReviewType;
  setReview: Dispatch<SetStateAction<ReviewType>>;
  handleReview: () => void;
}

const ReviewDialog = ({
  review,
  setReview,
  openReview,
  setOpenReview,
  handleReview,
}: IProps) => {
  const renderRating = (reviewType: REVIEW_TYPE) => {
    return (
      <>
        {reviewType === REVIEW_TYPE.COURSE
          ? [1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="cursor-pointer">
                {star <= review.courseRating ? (
                  <StarFilledIcon
                    className="h-6 w-6 text-yellow-400"
                    onClick={() => setReview({ ...review, courseRating: star })}
                  />
                ) : (
                  <StarIcon
                    className="h-6 w-6 text-yellow-400"
                    onClick={() => setReview({ ...review, courseRating: star })}
                  />
                )}
              </div>
            ))
          : [1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="cursor-pointer">
                {star <= review.mentorRating ? (
                  <StarFilledIcon
                    className="h-6 w-6 text-yellow-400"
                    onClick={() => setReview({ ...review, mentorRating: star })}
                  />
                ) : (
                  <StarIcon
                    className="h-6 w-6 text-yellow-400"
                    onClick={() => setReview({ ...review, mentorRating: star })}
                  />
                )}
              </div>
            ))}
      </>
    );
  };

  return (
    <Dialog
      open={openReview}
      onOpenChange={() => {
        setOpenReview(!openReview);
        setReview(initialReview);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Đánh giá</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="grid grid-cols-7 items-center gap-5">
            <Label className="col-span-3 text-black">Đánh giá khóa học: </Label>
            <div className="flex items-center gap-2">
              {renderRating(REVIEW_TYPE.COURSE)}
            </div>
          </div>

          <div className="grid grid-cols-7 items-center gap-5">
            <Label className="col-span-3 text-black">Đánh giá gia sư: </Label>
            <div className="flex items-center gap-2">
              {renderRating(REVIEW_TYPE.MENTOR)}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-black">Nhận xét khóa học</Label>
            <Input
              placeholder="Nhận xét..."
              value={review.courseReview}
              onChange={(e) =>
                setReview({
                  ...review,
                  courseReview: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-black">Nhận xét gia sư</Label>
            <Input
              placeholder="Nhận xét..."
              value={review.mentorReview}
              onChange={(e) =>
                setReview({
                  ...review,
                  mentorReview: e.target.value,
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-32"
            variant="outline"
            onClick={() => {
              setOpenReview(false);
              setReview(initialReview);
            }}
          >
            Đóng
          </Button>
          <Button className="w-32" onClick={handleReview}>
            Đánh giá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewDialog;
