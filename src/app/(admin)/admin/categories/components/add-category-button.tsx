"use client";

import { useState } from "react";

import CategoryModal from "@/app/(admin)/admin/categories/components/category-modal";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/schemas/category";

const AddCategoryButton = ({ categories }: { categories: CategoryType[] }) => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const handleOpenChange = () => {
    setOpenCategoryModal(!openCategoryModal);
  };

  return (
    <>
      <Button onClick={handleOpenChange}>Add Category</Button>

      <CategoryModal
        open={openCategoryModal}
        onOpenChange={handleOpenChange}
        categories={categories}
      />
    </>
  );
};
export default AddCategoryButton;
