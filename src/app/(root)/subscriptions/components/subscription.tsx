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
    <div className="grid min-h-[280px] grid-cols-5 gap-10">
      <div
        className={cn("col-span-2 space-y-5", {
          "col-auto": !data.length,
        })}
      >
        <CardList
          data={data}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
        />
      </div>

      <div className={"col-span-3"}>
        <SubscriptionDetail activeItemId={activeItemId} />
      </div>
    </div>
  );
};
export default Subscription;
