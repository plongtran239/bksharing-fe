"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { MessageSquareWarningIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import reportApi from "@/apis/report.api";
import ReportDialog from "@/app/(root)/(user)/users/[slug]/components/report-dialog";
import { REPORT_TYPE } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { FeedbackType } from "@/schemas/feedback.schema";
import {
  FeedbackReportRequest,
  FeedbackReportRequestType,
} from "@/schemas/report.schema";

const FeedbackCard = ({ feedback }: { feedback: FeedbackType }) => {
  const { toast } = useToast();

  const [openReport, setOpenReport] = useState(false);

  const reportForm = useForm<FeedbackReportRequestType>({
    resolver: zodResolver(FeedbackReportRequest),
    defaultValues: {
      feedbackId: feedback.id,
      type: REPORT_TYPE.FEEDBACK_INAPPROPRIATE,
      description: "",
    },
  });

  const renderRating = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <div key={star} className="cursor-pointer">
        {star <= feedback.mentorRating ? (
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

  const handleReport = async () => {
    try {
      await reportApi.createFeedbackReport(reportForm.getValues());
      setOpenReport(false);
      reportForm.reset();
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

          <div onClick={() => setOpenReport(true)}>
            <MessageSquareWarningIcon
              size={16}
              className="cursor-pointer hover:text-red-400"
            />
          </div>
        </div>

        <p className="text-black">{feedback.mentorReview}</p>
      </div>

      <ReportDialog
        openReport={openReport}
        setOpenReport={setOpenReport}
        reportForm={reportForm}
        handleReport={handleReport}
      />
    </>
  );
};
export default FeedbackCard;
