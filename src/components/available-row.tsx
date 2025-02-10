"use client";

import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const AvailableRow = ({
  span,
  children,
  handleClick,
  isActive,
  isBooked,
}: PropsWithChildren<{
  span: number;
  scheduleId: number;
  date?: string;
  isActive?: boolean;
  handleClick?: () => void;
  isBooked?: boolean;
}>) => {
  return (
    <td
      rowSpan={span}
      className={cn("cursor-pointer space-y-1 border border-gray-300", {
        "border-2 border-secondary-foreground bg-secondary text-secondary-foreground":
          isActive,
        "bg-primary text-white hover:bg-secondary hover:text-secondary-foreground":
          !isBooked,
        "cursor-not-allowed bg-red-500 text-white": isBooked,
      })}
      onClick={() => {
        handleClick && !isBooked && handleClick();
      }}
    >
      {children}
      {isActive && <p className="text-xs">(Đã chọn)</p>}
    </td>
  );
};
export default AvailableRow;
