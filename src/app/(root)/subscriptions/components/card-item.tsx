"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import feedbackApi from "@/apis/feedback.api";
import reportApi from "@/apis/report.api";
import subscriptionApi from "@/apis/subscription.api";
import ReportDialog from "@/app/(root)/subscriptions/components/report-dialog";
import ReviewDialog from "@/app/(root)/subscriptions/components/review-dialog";
import AlertDialog from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MEETING_STATUS, SUBSCRIPTION_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn, convertMilisecondsToLocaleString } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import {
  SubscriptionReportRequest,
  SubscriptionReportRequestType,
} from "@/schemas/report.schema";
import { SubscriptionType } from "@/schemas/subscription.schema";

interface IProps {
  item: SubscriptionType;
  isActive: boolean;
  setActiveItemId: Dispatch<SetStateAction<number | undefined>>;
}

export type ReviewType = {
  courseRating: number;
  courseReview: string;
  mentorRating: number;
  mentorReview: string;
};

export const initialReview: ReviewType = {
  courseRating: 0,
  courseReview: "",
  mentorRating: 0,
  mentorReview: "",
};

const CardItem = ({ item, isActive, setActiveItemId }: IProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setPaymentId } = useAppContext();

  const hasCancelButton =
    item.status === SUBSCRIPTION_STATUS.PENDING ||
    item.status === SUBSCRIPTION_STATUS.ACCEPTED;
  const hasPaymentButton = item.status === SUBSCRIPTION_STATUS.ACCEPTED;
  const hasJoinMeetingButton = item.audiCall?.status === MEETING_STATUS.ONGOING;

  const [openReview, setOpenReview] = useState(false);
  const [review, setReview] = useState<ReviewType>(initialReview);

  const reportForm = useForm<SubscriptionReportRequestType>({
    resolver: zodResolver(SubscriptionReportRequest),
    defaultValues: {
      subscriptionId: item.id,
      description: "",
      type: undefined,
    },
  });

  const [openReport, setOpenReport] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);

      await subscriptionApi.cancelSubscription(item.id);

      setOpen(false);

      toast({
        title: "Thành công",
        description: "Hủy đăng ký khóa học thành công",
      });

      router.refresh();

      setActiveItemId(undefined);
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
      await feedbackApi.createFeedback({
        ...review,
        subscriptionId: item.id,
      });

      setOpenReview(false);
      setReview(initialReview);

      toast({
        title: "Thành công",
        description: "Đánh giá thành công",
      });

      router.refresh();
    } catch (error) {
      console.error({ error });
    }
  };

  const handleReport = async () => {
    try {
      await reportApi.createSubscriptionReport(reportForm.getValues());

      setOpenReport(false);

      reportForm.reset();

      router.refresh();

      toast({
        title: "Thành công",
        description: "Báo cáo thành công",
      });
    } catch (error) {
      console.error({ error });
    }
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
            <p className="line-clamp-1 max-w-64 font-semibold text-primary">
              {item.course.name}
            </p>
            <p className="text-sm text-black">{item.mentorInfo.name}</p>
            <p className="text-sm text-gray-500">
              {convertMilisecondsToLocaleString(item.courseStartAt, "vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
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

          <div className="flex items-center gap-5">
            {item.status === SUBSCRIPTION_STATUS.ENDED && !item.feedback && (
              <Button className="px-3" onClick={() => setOpenReview(true)}>
                Đánh giá
              </Button>
            )}

            {item.feedback && (
              <Button
                variant="link"
                className="flex-center w-full gap-2 px-0 disabled:opacity-70"
                disabled
              >
                Đã đánh giá
                <CheckIcon size={16} />
              </Button>
            )}

            {item.status === SUBSCRIPTION_STATUS.ENDED && !item.report && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div onClick={() => setOpenReport(true)}>
                      <TriangleAlertIcon size={20} className="text-red-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Báo cáo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

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

      <ReviewDialog
        openReview={openReview}
        setOpenReview={setOpenReview}
        review={review}
        setReview={setReview}
        handleReview={handleReview}
      />

      <ReportDialog
        openReport={openReport}
        setOpenReport={setOpenReport}
        reportForm={reportForm}
        handleReport={handleReport}
      />
    </>
  );
};
export default CardItem;
