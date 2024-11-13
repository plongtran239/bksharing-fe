"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheckIcon, CircleXIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import adminApi from "@/apis/admin.api";
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
import { Separator } from "@/components/ui/separator";
import { COURSE_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { convertToCapitalizeCase, generateNameId } from "@/lib/utils";
import { CourseType } from "@/schemas";

const CourseTable = ({ data }: { data: CourseType[] }) => {
  const router = useRouter();

  const { toast } = useToast();

  const handleProcessCourse = async (courseId: number, isApproved: boolean) => {
    try {
      await adminApi.approveCourse(courseId, isApproved);

      const toastMessage = isApproved
        ? "Course has been approved!"
        : "Course has been rejected!";

      toast({
        title: "Success",
        description: toastMessage,
      });

      router.refresh();
    } catch (error) {
      console.error({ error });

      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<CourseType>[] = [
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="line-clamp-1 max-w-[300px]">{row.getValue("name")}</div>
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
      accessorKey: "mentor",
      header: "Mentor",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.mentor.name}</div>
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
                onClick={() =>
                  router.push(
                    `/admin/courses/${generateNameId({
                      name: row.original.name,
                      id: row.original.id,
                    })}`
                  )
                }
                className="flex items-center gap-2"
              >
                <EyeIcon size={16} />
                View details
              </DropdownMenuItem>

              <Separator className="my-1" />

              {row.original.status === COURSE_STATUS.PENDING ? (
                <>
                  <DropdownMenuItem
                    onClick={() => handleProcessCourse(row.original.id, true)}
                    className="flex items-center gap-2"
                  >
                    <CircleCheckIcon size={16} />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleProcessCourse(row.original.id, false)}
                    className="flex items-center gap-2"
                  >
                    <CircleXIcon size={16} />
                    Reject
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    handleProcessCourse(
                      row.original.id,
                      row.original.status === COURSE_STATUS.REJECTED
                    )
                  }
                  className="flex items-center gap-2"
                >
                  {row.original.status === COURSE_STATUS.APPROVED ? (
                    <>
                      <CircleXIcon size={16} />
                      Reject
                    </>
                  ) : (
                    <>
                      <CircleCheckIcon size={16} />
                      Accept
                    </>
                  )}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      searchBy="name"
      filterBy="status"
      filterOptions={[
        COURSE_STATUS.PENDING,
        COURSE_STATUS.APPROVED,
        COURSE_STATUS.REJECTED,
      ]}
    />
  );
};
export default CourseTable;
