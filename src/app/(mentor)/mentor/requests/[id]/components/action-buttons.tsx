"use client";

import { useRouter } from "next/navigation";

import subscriptionApi from "@/apis/subscription.api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionDetailType } from "@/schemas/subscription.schema";

const ActionButtons = ({
  subscription,
}: {
  subscription: SubscriptionDetailType;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleRequest = async (subscriptionId: number, isApproved: boolean) => {
    try {
      await subscriptionApi.mentorApproveSubscription({
        subscriptionId,
        isApproved,
      });

      router.refresh();

      toast({
        title: "Thành công",
        description: isApproved ? "Đã chấp nhận yêu cầu" : "Đã từ chối yêu cầu",
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="flex items-center gap-5">
      <Button onClick={() => handleRequest(subscription.id, true)}>
        Chấp nhận
      </Button>

      <Button
        variant="destructive"
        onClick={() => handleRequest(subscription.id, false)}
      >
        Từ chối
      </Button>
    </div>
  );
};
export default ActionButtons;
