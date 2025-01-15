"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import dashboardApi from "@/apis/dashboard.api";
import DataTable from "@/components/data-table";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALE } from "@/constants/date";
import { DashboardSubscriptionType } from "@/schemas/dashboard.schema";

const SubscriptionTable = () => {
  const t = useTranslations("subscriptionStatus");

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [subscriptions, setSubscriptions] = useState<
    DashboardSubscriptionType[]
  >([]);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        setLoading(true);
        const {
          payload: { data },
        } = await dashboardApi.subscriptions();
        setSubscriptions(data);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    }
    fetchSubscriptions();
  }, []);

  const columns: ColumnDef<DashboardSubscriptionType>[] = [
    {
      accessorKey: "course",
      header: "Khóa học",
      cell: ({ row }) => row.original.course.name,
    },
    {
      accessorKey: "mentorInfo",
      header: "Gia sư",
      cell: ({ row }) => row.original.mentorInfo.name,
    },
    {
      accessorKey: "studentInfo",
      header: "Học viên",
      cell: ({ row }) => row.original.studentInfo.name,
    },
    {
      accessorKey: "originalPrice",
      header: "Giá",
      cell: ({ row }) =>
        Intl.NumberFormat(LOCALE, {
          style: "currency",
          currency: "VND",
        }).format(row.original.originalPrice),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => t(row.original.status.toLowerCase()),
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
                  router.push(`/admin/subscriptions/${row.original.id}`)
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

  if (loading) {
    return <Loader />;
  }

  return <DataTable columns={columns} data={subscriptions} />;
};
export default SubscriptionTable;
