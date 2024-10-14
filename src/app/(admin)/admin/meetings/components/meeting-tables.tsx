"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { PlayIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MEETING_STATUS } from "@/constants/enum";
import {
  convertMilisecondsToLocalString,
  convertToCapitalizeCase,
} from "@/lib/utils";
import { MeetingType } from "@/schemas/meeting/meeting.schema";

const MeetingTable = ({ data }: { data: MeetingType[] }) => {
  const router = useRouter();

  const columns: ColumnDef<MeetingType>[] = [
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
      accessorKey: "title",
      header: ({}) => {
        return <button className="flex-center">Title</button>;
      },
      cell: ({ row }) => <div className="">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "startsAt",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Date & Time
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div>
          {convertMilisecondsToLocalString(row.getValue("startsAt"), "en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {convertToCapitalizeCase(row.getValue("status"))}
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => {
                  router.push(`/meeting/${row.original.id}`);
                }}
                className="flex items-center gap-2"
              >
                <PlayIcon size={16} />
                Start Meeting
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-2"
              >
                <XIcon size={16} />
                Cancel Meeting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data.sort((a, b) => Number(a.startsAt) - Number(b.startsAt))}
        searchBy="title"
        filterBy="status"
        filterOptions={Object.values(MEETING_STATUS)}
      />
    </>
  );
};
export default MeetingTable;
