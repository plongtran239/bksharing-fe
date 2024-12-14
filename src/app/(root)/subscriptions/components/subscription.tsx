"use client";

import { useState } from "react";

import CardList from "@/app/(root)/subscriptions/components/card-list";
import SubscriptionDetail from "@/app/(root)/subscriptions/components/subscription-detail";
import { cn } from "@/lib/utils";
import { SubscriptionType } from "@/schemas/subscription.schema";

interface IProps {
  data: SubscriptionType[];
}

const Subscription = ({ data }: IProps) => {
  const [activeItemId, setActiveItemId] = useState<number | undefined>(
    data[0]?.id
  );

  return (
    <div
      className={cn("grid min-h-[280px] grid-cols-2 gap-10", {
        "grid-cols-1": !activeItemId,
      })}
    >
      {activeItemId && (
        <div className="space-y-5">
          <CardList
            data={data}
            activeItemId={activeItemId}
            setActiveItemId={setActiveItemId}
          />
        </div>
      )}

      <SubscriptionDetail activeItemId={activeItemId} />
    </div>
  );
};
export default Subscription;
