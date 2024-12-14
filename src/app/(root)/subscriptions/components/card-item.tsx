"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import paymentApi from "@/apis/payment.api";
import subscriptionApi from "@/apis/subscription.api";
import AlertDialog from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn, convertMilisecondsToLocaleString } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { SubscriptionType } from "@/schemas/subscription.schema";

interface IProps {
  item: SubscriptionType;
  isActive: boolean;
  setActiveItemId: Dispatch<SetStateAction<number | undefined>>;
}

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
      const {
        payload: { data },
      } = await paymentApi.makePayment({
        courseId: item.course.id,
        subscriptionId: item.id,
        amount: item.originalPrice,
        description: item.course.name,
      });

      setPaymentId(data.payment.id);

      router.push(data.url);
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
            <p className="font-semibold text-primary">{item.course.name}</p>
            <p className="text-sm text-black">{item.mentorInfo.name}</p>
            <p className="text-sm text-gray-500">
              {convertMilisecondsToLocaleString(item.courseStartAt)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-3">
          {hasPaymentButton && (
            <Button className="px-3" onClick={handleMakePayment}>
              Thanh toán
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
    </>
  );
};
export default CardItem;
