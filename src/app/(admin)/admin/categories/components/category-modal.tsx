"use client";

import { UseFormReturn } from "react-hook-form";

import Loader from "@/components/loader";
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
import { Textarea } from "@/components/ui/textarea";
import { CategoryRequestType } from "@/schemas";

interface IProps {
  open: boolean;
  onOpenChange: () => void;
  editCategoryId?: number;
  form?: UseFormReturn<CategoryRequestType>;
  onSubmit: (values: CategoryRequestType) => void;
  isLoading: boolean;
}

const CategoryModal = ({
  open,
  onOpenChange,
  editCategoryId,
  form,
  onSubmit,
  isLoading,
}: IProps) => {
  const isEdit = Boolean(editCategoryId);

  if (!form) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
          <DialogDescription>
            {isEdit
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

            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
              >
                {!isLoading ? isEdit ? "Update" : "Add" : <Loader />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CategoryModal;
