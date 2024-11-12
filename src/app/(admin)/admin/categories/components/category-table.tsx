"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import categoryApi from "@/apis/category.api";
import CategoryModal from "@/app/(admin)/admin/categories/components/category-modal";
import AlertDialog from "@/components/alert-dialog";
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
import { useToast } from "@/hooks/use-toast";
import { CategoryType } from "@/schemas";

type CategoryTableType = CategoryType & { parent: string };

interface IProps {
  data: CategoryType[];
}

const CategoryTable = ({ data }: IProps) => {
  const { toast } = useToast();

  const router = useRouter();

  const [editCategory, setEditCategory] = useState<CategoryType | undefined>(
    undefined
  );

  const [deleteCategoryId, setDeleteCategoryId] = useState<number | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const handleOpenChange = () => {
    setOpenCategoryModal(!openCategoryModal);
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      setIsLoading(true);
      await categoryApi.deleteCategory(id);
      toast({
        title: "Success",
        description: "Delete category successfully!",
      });

      setOpenAlertDialog(false);

      router.refresh();
    } catch (error) {
      console.error({ error });
      toast({
        title: "Error",
        description: "Cannot delete parent category!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const columns: ColumnDef<CategoryTableType>[] = [
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
          {row.getValue("description") || "No description"}
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
                className="flex items-center gap-2"
                onClick={() => {
                  handleOpenChange();
                  setEditCategory(row.original);
                }}
              >
                <PencilIcon size={16} />
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  setOpenAlertDialog(true);
                  setDeleteCategoryId(row.original.id);
                }}
              >
                <TrashIcon size={16} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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

  return (
    <>
      <DataTable columns={columns} data={newData} searchBy="name" />

      <CategoryModal
        open={openCategoryModal}
        onOpenChange={handleOpenChange}
        editCategory={editCategory}
        categories={data}
      />

      <AlertDialog
        open={openAlertDialog}
        onOpenChange={() => setOpenAlertDialog(!openAlertDialog)}
        onCancel={() => {
          setOpenAlertDialog(false);
          setDeleteCategoryId(undefined);
        }}
        onConfirm={() => {
          handleDeleteCategory(deleteCategoryId as number);
        }}
        isLoading={isLoading}
        title="Are you sure you want to delete this category?"
        description="This action cannot be undone. This will permanently delete this category."
      />
    </>
  );
};
export default CategoryTable;
