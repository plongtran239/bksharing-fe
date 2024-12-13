"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import subscriptionApi from "@/apis/subscription.api";
import AlertDialog from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn, convertMilisecondsToLocaleString } from "@/lib/utils";
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
              src="/images/default-user.png"
              alt="avatar"
              fill
              className="rounded-full"
            />
          </div>
          <div className="ml-4">
            <p className="font-semibold">{item.course.name}</p>
            <p className="text-sm text-gray-500">
              {convertMilisecondsToLocaleString(item.courseStartAt)}
            </p>
          </div>
        </div>

        {item.status !== SUBSCRIPTION_STATUS.CANCELED && (
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
