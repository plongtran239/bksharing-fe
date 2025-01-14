"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import dashboardApi from "@/apis/dashboard.api";
import DataTable from "@/components/data-table";
import Loader from "@/components/loader";
import { LOCALE } from "@/constants/date";
import { DashboardSubscriptionType } from "@/schemas/dashboard.schema";

const SubscriptionTable = () => {
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
      cell: ({ row }) => row.original.status.toLowerCase(),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return <DataTable columns={columns} data={subscriptions} />;
};
export default SubscriptionTable;
