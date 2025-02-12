"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, UserRoundCheckIcon, UserRoundXIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import subscriptionApi from "@/apis/subscription.api";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SUBSCRIPTION_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { convertMilisecondsToLocaleString } from "@/lib/utils";
import { SubscriptionType } from "@/schemas/subscription.schema";

const RequestTable = ({ data }: { data: SubscriptionType[] }) => {
  const t = useTranslations("subscriptionStatus");

  const { toast } = useToast();
  const router = useRouter();

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

  const columns: ColumnDef<SubscriptionType>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "studentInfo",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Học viên
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="line-clamp-1 max-w-[300px]">
          {row.original.studentInfo.name}
        </div>
      ),
    },
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
                  router.push(`/mentor/requests/${row.original.id}`)
                }
                className="flex items-center gap-2"
              >
                <EyeIcon size={16} />
                Xem chi tiết
              </DropdownMenuItem>

              {row.original.status === SUBSCRIPTION_STATUS.PENDING && (
                <>
                  <Separator />
                  <DropdownMenuItem
                    onClick={() => handleRequest(row.original.id, true)}
                    className="flex items-center gap-2"
                  >
                    <UserRoundCheckIcon size={16} />
                    Chấp nhận
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRequest(row.original.id, false)}
                    className="flex items-center gap-2"
                  >
                    <UserRoundXIcon size={16} />
                    Từ chối
                  </DropdownMenuItem>
                </>
              )}
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
        SUBSCRIPTION_STATUS.PENDING,
        SUBSCRIPTION_STATUS.ACCEPTED,
        SUBSCRIPTION_STATUS.CANCELED,
        SUBSCRIPTION_STATUS.EXPIRED,
        SUBSCRIPTION_STATUS.REJECTED,
      ])}
      noFilterAll
    />
  );
};
export default RequestTable;
