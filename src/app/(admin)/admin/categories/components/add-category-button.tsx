"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import categoryApi from "@/apis/category.api";
import CategoryModal from "@/app/(admin)/admin/categories/components/category-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CategoryRequest, CategoryRequestType } from "@/schemas";

const AddCategoryButton = () => {
  const { toast } = useToast();

  const router = useRouter();

  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategoryRequestType>({
    resolver: zodResolver(CategoryRequest),
    defaultValues: {
      name: "",
      description: "",
      parentCategoryId: undefined,
    },
  });

  const handleOpenChange = () => {
    setOpenCategoryModal(!openCategoryModal);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      await categoryApi.createCategory(form.getValues());

      form.reset();

      setOpenCategoryModal(false);

      toast({
        title: "Success",
        description: "Category created successfully",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button className="px-5" onClick={handleOpenChange}>
        <PlusIcon className="mr-2" size={16} />
        Thêm danh mục
      </Button>

      <CategoryModal
        open={openCategoryModal}
        onOpenChange={handleOpenChange}
        form={form}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};
export default AddCategoryButton;
