"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronUpIcon,
  PencilIcon,
  PlusSquareIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CategoryRequest, CategoryRequestType, CategoryType } from "@/schemas";

interface IProps {
  data: CategoryType[];
}

const CategoryTable = ({ data }: IProps) => {
  const { toast } = useToast();

  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (rowId: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const router = useRouter();

  const [editCategoryId, setEditCategoryId] = useState<number | undefined>(
    undefined
  );

  const [deleteCategoryId, setDeleteCategoryId] = useState<number | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const form = useForm<CategoryRequestType>({
    resolver: zodResolver(CategoryRequest),
    defaultValues: {
      name: "",
      description: "",
      parentCategoryId: undefined,
    },
  });

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

  const handleSubmit = async (values: CategoryRequestType) => {
    try {
      setIsLoading(true);

      if (editCategoryId) {
        await categoryApi.updateCategory(editCategoryId, values);

        toast({
          title: "Success",
          description: "Category updated successfully!",
        });
      } else {
        await categoryApi.createCategory(values);

        toast({
          title: "Success",
          description: "Category created successfully!",
        });
      }

      form.reset();

      setOpenCategoryModal(false);

      router.refresh();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate rows with expanded rows logic
  const rowsWithExpanded = data.flatMap((category) => {
    const isExpanded = expandedRows[category.id];
    const childRows = isExpanded
      ? category.childCategories.map((child) => ({
          ...child,
          isChild: true, // Mark row as child
        }))
      : [];

    return [category, ...childRows];
  });

  const columns: ColumnDef<CategoryType>[] = [
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
      header: ({}) => {
        return <div>Name</div>;
      },
      cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
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
      accessorKey: "childCategories",
      header: "Child Categories",
      cell: ({ row }) => {
        const isChild = row.original.parentCategoryId !== null;

        if (isChild) {
          return null;
        }

        const childCategories = row.getValue(
          "childCategories"
        ) as CategoryType[];
        const isExpanded = expandedRows[row.original.id];

        return (
          <div>
            <Button
              variant="link"
              className="flex items-center gap-2 bg-transparent px-0 text-foreground"
              onClick={() => toggleRow(row.original.id)}
            >
              {childCategories.length} child categories
              <ChevronUpIcon
                className={`h-4 w-4 transition-transform ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </Button>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const isParent = row.original.parentCategoryId === null;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isParent && (
                <>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => {
                      setOpenCategoryModal(true);
                      form.setValue("parentCategoryId", row.original.id);
                      console.log({ form: form.getValues() });
                    }}
                  >
                    <PlusSquareIcon size={16} />
                    Add Child Category
                  </DropdownMenuItem>
                  <Separator />
                </>
              )}

              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  setOpenCategoryModal(true);
                  setEditCategoryId(row.original.id);
                  form.setValue("name", row.original.name);
                  form.setValue("description", row.original.description);
                  form.setValue(
                    "parentCategoryId",
                    row.original.parentCategoryId || undefined
                  );
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

  return (
    <>
      <DataTable columns={columns} data={rowsWithExpanded} searchBy="name" />

      <CategoryModal
        open={openCategoryModal}
        onOpenChange={() => {
          setOpenCategoryModal(!openCategoryModal);
          setEditCategoryId(undefined);
          form.reset();
        }}
        editCategoryId={editCategoryId}
        form={form}
        onSubmit={handleSubmit}
        isLoading={isLoading}
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
