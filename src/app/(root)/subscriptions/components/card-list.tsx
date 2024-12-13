"use client";

import { Dispatch, SetStateAction } from "react";

import CardItem from "@/app/(root)/subscriptions/components/card-item";
import { SubscriptionType } from "@/schemas/subscription.schema";

interface IProps {
  data: SubscriptionType[];
  activeItemId: number | undefined;
  setActiveItemId: Dispatch<SetStateAction<number | undefined>>;
}

const CardList = ({ data, activeItemId, setActiveItemId }: IProps) => {
  return (
    <div>
      {data.map((item) => (
        <CardItem
          key={item.id}
          item={item}
          isActive={activeItemId === item.id}
          setActiveItemId={setActiveItemId}
        />
      ))}
    </div>
  );
};
export default CardList;
