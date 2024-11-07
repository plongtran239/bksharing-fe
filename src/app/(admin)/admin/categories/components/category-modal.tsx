"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import categoryApi from "@/apis/category.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CategoryRequest, CategoryRequestType, CategoryType } from "@/schemas";

const CategoryModal = ({
  open,
  onOpenChange,
  editCategory,
  categories,
}: {
  open: boolean;
  onOpenChange: () => void;
  editCategory?: CategoryType;
  categories: CategoryType[];
}) => {
  const { toast } = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategoryRequestType>({
    resolver: zodResolver(CategoryRequest),
    defaultValues: {
      name: "",
      description: "",
      parentCategoryId: undefined,
    },
  });

  useEffect(() => {
    if (editCategory) {
      form.reset({
        name: editCategory.name,
        description:
          editCategory.description === null ? "" : editCategory.description,
        parentCategoryId: editCategory.parentCategoryId || undefined,
      });
    }
  }, [editCategory, form]);

  const filteredCategories: CategoryType[] = editCategory
    ? categories.filter((category) => category.id !== editCategory.id)
    : categories;

  const onSubmit = async (values: CategoryRequestType) => {
    try {
      setIsLoading(true);

      if (editCategory) {
        await categoryApi.updateCategory(editCategory.id, values);

        toast({
          title: "Success",
          description: "Category updated successfully!",
        });
      } else {
        await categoryApi.createCategory(values);

        toast({
          title: "Success",
          description: "Category added successfully!",
        });
      }
    } catch (error) {
      console.error({ error });
    } finally {
      form.reset({
        name: "",
        description: "",
        parentCategoryId: undefined,
      });

      onOpenChange();

      setIsLoading(false);

      router.refresh();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange();
        form.reset({
          name: "",
          description: "",
          parentCategoryId: undefined,
        });
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editCategory
              ? `Edit Category - ${editCategory.name}`
              : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {editCategory
              ? "Update the details of the category"
              : "Add a new category to the system"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel required>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="category description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentCategoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Parent Category</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange({
                        target: { value: parseInt(value) },
                      })
                    }
                    defaultValue={
                      field.value ? field.value.toString() : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn("text-sm", {
                          "text-muted-foreground": !field.value,
                        })}
                      >
                        <SelectValue placeholder="select parent category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px]">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="text-center text-sm text-muted-foreground">
                          No Parent Category
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
              >
                {!isLoading ? (editCategory ? "Update" : "Add") : "Loading..."}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CategoryModal;
