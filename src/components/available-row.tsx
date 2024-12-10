"use client";

import { PropsWithChildren } from "react";

const AvailableRow = ({
  span,
  children,
  scheduleId,
}: PropsWithChildren<{
  span: number;
  scheduleId: number;
}>) => {
  return (
    <td
      rowSpan={span}
      className="cursor-pointer border border-gray-300 bg-green-500 text-white hover:bg-secondary hover:text-secondary-foreground"
      onClick={() => alert(`Schedule ID: ${scheduleId}`)}
    >
      {children}
    </td>
  );
};
export default AvailableRow;
