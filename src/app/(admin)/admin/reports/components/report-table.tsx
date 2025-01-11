"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { REPORT_STATUS } from "@/constants/enum";
import {
  convertMilisecondsToLocaleString,
  convertToCapitalizeCase,
  generateNameId,
} from "@/lib/utils";
import { ReportType } from "@/schemas/report.schema";

const ReportTable = ({ data }: { data: ReportType[] }) => {
  const router = useRouter();

  const columns: ColumnDef<ReportType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "type",
      header: ({}) => {
        return <div>Type</div>;
      },
      cell: ({ row }) => (
        <div className="">{convertToCapitalizeCase(row.getValue("type"))}</div>
      ),
    },
    {
      accessorKey: "description",
      header: ({}) => {
        return <div>Description</div>;
      },
      cell: ({ row }) => (
        <div className="line-clamp-1 max-w-[300px]">
          {row.getValue("description") || "No description"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({}) => {
        return <div>Status</div>;
      },
      cell: ({ row }) => (
        <div className="">
          {convertToCapitalizeCase(row.getValue("status"))}
        </div>
      ),
    },
    {
      accessorKey: "reporter",
      header: ({}) => {
        return <div>Reporter</div>;
      },
      cell: ({ row }) => <div className="">{row.original.reporter.name}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({}) => {
        return <div>Created At</div>;
      },
      cell: ({ row }) => (
        <div className="">
          {convertMilisecondsToLocaleString(row.getValue("createdAt"))}
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
                className="flex items-center gap-2"
                onClick={() =>
                  router.push(
                    `/admin/reports/${generateNameId({
                      id: row.original.id,
                      name: row.original.reporter.name,
                    })}`
                  )
                }
              >
                <EyeIcon size={16} />
                View Report
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
      data={data}
      filterBy="status"
      filterOptions={Object.values(REPORT_STATUS)}
    />
  );
};
export default ReportTable;
