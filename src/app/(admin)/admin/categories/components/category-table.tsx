"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

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
import { CategoryType } from "@/schemas/category";

type CategoryTableType = CategoryType & { parent: string };

interface IProps {
  data: CategoryType[];
}

export const columns: ColumnDef<CategoryTableType>[] = [
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({}) => {
      return <div>Description</div>;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 max-w-[300px]">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "parent",
    header: ({}) => {
      return <div>Parent</div>;
    },
    cell: ({ row }) => <div>{row.getValue("parent") ?? "None"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({}) => {
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

            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const CategoryTable = ({ data }: IProps) => {
  const newData = [
    ...data,
    ...data
      .map((category) => {
        if (category.childCategories.length > 0) {
          return category.childCategories.map((childCategory) => ({
            ...childCategory,
            parent: category.name,
          }));
        }
        return null;
      })
      .flat()
      .filter((item) => item !== null),
  ];

  return <DataTable columns={columns} data={newData} />;
};
export default CategoryTable;
