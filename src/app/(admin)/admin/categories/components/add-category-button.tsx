"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import CategoryModal from "@/app/(admin)/admin/categories/components/category-modal";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/schemas";

const AddCategoryButton = ({ categories }: { categories: CategoryType[] }) => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const handleOpenChange = () => {
    setOpenCategoryModal(!openCategoryModal);
  };

  return (
    <>
      <Button className="px-5" onClick={handleOpenChange}>
        <PlusIcon className="mr-2" size={16} />
        Add Category
      </Button>

      <CategoryModal
        open={openCategoryModal}
        onOpenChange={handleOpenChange}
        categories={categories}
      />
    </>
  );
};
export default AddCategoryButton;
