"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUBSCRIPTION_STATUS } from "@/constants/enum";
import { convertMilisecondsToLocaleString } from "@/lib/utils";
import { CombinationSubscriptionType } from "@/schemas/subscription.schema";

const SubscriptionTable = ({
  data,
}: {
  data: CombinationSubscriptionType[];
}) => {
  const t = useTranslations("subscriptionStatus");

  const router = useRouter();

  const columns: ColumnDef<CombinationSubscriptionType>[] = [
    {
      accessorKey: "course",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Khóa học
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="line-clamp-1 max-w-[300px]">
          {row.original.course.name}
        </div>
      ),
    },
    {
      accessorKey: "ids",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Số lượng học viên
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="line-clamp-1 max-w-[300px]">
          {row.original.ids.length}
        </div>
      ),
    },

    {
      accessorKey: "courseStartAt",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Thời gian bắt đầu
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="line-clamp-1 max-w-[300px]">
          {convertMilisecondsToLocaleString(
            row.getValue("courseStartAt"),
            "vi-VN",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "numeric",
              timeZone: "UTC",
            }
          )}
        </div>
      ),
    },
    {
      accessorKey: "courseEndAt",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Thời gian kết thúc
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="line-clamp-1 max-w-[300px]">
          {convertMilisecondsToLocaleString(
            row.getValue("courseEndAt"),
            "vi-VN",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "numeric",
              timeZone: "UTC",
            }
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({}) => {
        return <div>Trạng thái</div>;
      },
      cell: ({ row }) => (
        <div className="line-clamp-1 max-w-[300px]">
          {t(row.original.status.toLowerCase())}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/combination-subscriptions/${row.original.ids[0]}`
                  )
                }
                className="flex items-center gap-2"
              >
                <EyeIcon size={16} />
                Xem chi tiết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data.sort(
        (a, b) => Number(a.courseStartAt) - Number(b.courseStartAt)
      )}
      filterBy="status"
      filterOptions={Object.values([
        SUBSCRIPTION_STATUS.ACTIVE,
        SUBSCRIPTION_STATUS.ENDED,
      ])}
      noFilterAll
    />
  );
};
export default SubscriptionTable;
