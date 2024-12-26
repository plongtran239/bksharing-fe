"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import feedbackApi from "@/apis/feedback.api";
import subscriptionApi from "@/apis/subscription.api";
import AlertDialog from "@/components/alert-dialog";
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
import {
  MEETING_STATUS,
  REVIEW_TYPE,
  SUBSCRIPTION_STATUS,
} from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn, convertMilisecondsToLocaleString } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { SubscriptionType } from "@/schemas/subscription.schema";

interface IProps {
  item: SubscriptionType;
  isActive: boolean;
  setActiveItemId: Dispatch<SetStateAction<number | undefined>>;
}

type ReviewType = {
  courseRating: number;
  courseContent: string;
  mentorRating: number;
  mentorContent: string;
};

const initialReview: ReviewType = {
  courseRating: 0,
  courseContent: "",
  mentorRating: 0,
  mentorContent: "",
};

const CardItem = ({ item, isActive, setActiveItemId }: IProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setPaymentId } = useAppContext();

  const hasCancelButton =
    item.status === SUBSCRIPTION_STATUS.PENDING ||
    item.status === SUBSCRIPTION_STATUS.ACCEPTED;
  const hasPaymentButton = item.status === SUBSCRIPTION_STATUS.ACCEPTED;
  const hasJoinMeetingButton = item.audiCall?.status === MEETING_STATUS.ONGOING;
  const hasReivewButton = item.status === SUBSCRIPTION_STATUS.ENDED;

  const [review, setReview] = useState<ReviewType>(initialReview);

  const handleCancel = async () => {
    try {
      setLoading(true);

      await subscriptionApi.cancelSubscription(item.id);

      setActiveItemId(undefined);

      setOpen(false);

      toast({
        title: "Thành công",
        description: "Hủy đăng ký khóa học thành công",
      });

      router.refresh();
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = async () => {
    try {
      if (item.payment) {
        const {
          payload: { data },
        } = await subscriptionApi.continueMakePaymentSubscription(item.id, {
          message: `Thanh toán tiếp cho khóa học ${item.course.name}`,
        });

        setPaymentId(data.payment.id);

        router.push(data.url);
      } else {
        const {
          payload: { data },
        } = await subscriptionApi.makePaymentSubScription(item.id, {
          message: `Thanh toán cho khóa học ${item.course.name}`,
        });

        setPaymentId(data.payment.id);

        router.push(data.url);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const handleReview = async () => {
    try {
      await Promise.all([
        feedbackApi.createFeedback({
          content: review.courseContent,
          rating: review.courseRating,
          reviewType: REVIEW_TYPE.COURSE,
          courseId: item.course.id,
        }),
        feedbackApi.createFeedback({
          content: review.mentorContent,
          rating: review.mentorRating,
          reviewType: REVIEW_TYPE.MENTOR,
          mentorId: item.mentorInfo.id,
        }),
      ]);

      setOpenReview(false);

      toast({
        title: "Thành công",
        description: "Đánh giá thành công",
      });
    } catch (error) {
      console.error({ error });
    }
  };

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
    <>
      <div
        className={cn(
          "flex items-center justify-between rounded-lg border border-primary bg-white p-4 shadow",
          {
            "bg-secondary": isActive,
          }
        )}
        onClick={() => setActiveItemId(item.id)}
      >
        <div className="flex items-center">
          <div className="relative h-10 w-10">
            <Image
              src={
                item.mentorInfo.thumbnail?.originalUrl ||
                "/images/default-user.png"
              }
              alt="avatar"
              fill
              className="rounded-full"
            />
          </div>

          <div className="ml-4 space-y-1">
            <p className="font-semibold text-primary">{item.course.name}</p>
            <p className="text-sm text-black">{item.mentorInfo.name}</p>
            <p className="text-sm text-gray-500">
              {convertMilisecondsToLocaleString(item.courseStartAt, "vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="flex-center gap-3">
          {item.status === SUBSCRIPTION_STATUS.ACTIVE &&
            item.audiCall?.status === MEETING_STATUS.SCHEDULED && (
              <p>Chưa diễn ra</p>
            )}

          {hasPaymentButton && (
            <Button className="px-3" onClick={handleMakePayment}>
              Thanh toán
            </Button>
          )}

          {hasReivewButton && (
            <Button className="px-3" onClick={() => setOpenReview(true)}>
              Đánh giá
            </Button>
          )}

          {hasCancelButton && (
            <Button
              variant={"destructive"}
              className="bg-red-300 px-4 text-xs"
              onClick={() => setOpen(true)}
              disabled={loading}
            >
              Hủy
            </Button>
          )}

          {hasJoinMeetingButton && (
            <Button
              className="px-4 text-xs"
              onClick={() => router.push(`/meeting/${item.audiCall?.cid}`)}
            >
              Vào học
            </Button>
          )}
        </div>
      </div>

      <AlertDialog
        open={open}
        onOpenChange={() => setOpen(!open)}
        title="Hủy đăng ký"
        description="Bạn có chắc chắn muốn hủy đăng ký khóa học này không?"
        onConfirm={handleCancel}
        onCancel={() => setOpen(false)}
        isLoading={loading}
      />

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
              <Label className="col-span-3 text-black">
                Đánh giá khóa học:{" "}
              </Label>
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
                value={review.courseContent}
                onChange={(e) =>
                  setReview({
                    ...review,
                    courseContent: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-black">Nhận xét gia sư</Label>
              <Input
                placeholder="Nhận xét..."
                value={review.mentorContent}
                onChange={(e) =>
                  setReview({
                    ...review,
                    mentorContent: e.target.value,
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
    </>
  );
};
export default CardItem;
