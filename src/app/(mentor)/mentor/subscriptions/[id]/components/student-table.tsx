"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/data-table";
import { DetailCombinationSubscriptionType } from "@/schemas/subscription.schema";

const StudentTable = ({
  data,
}: {
  data: DetailCombinationSubscriptionType;
}) => {
  const columns: ColumnDef<{
    name: string;
    email: string;
    phoneNumber: string;
  }>[] = [
    {
      accessorKey: "name",
      header: "Tên học viên",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
      cell: ({ row }) => <span>{row.original.phoneNumber}</span>,
    },
  ];

  return (
    <DataTable
      data={data.combinedStudents.map((s) => s.info)}
      columns={columns}
    />
  );
};
export default StudentTable;
