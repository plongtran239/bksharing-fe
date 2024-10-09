import { Metadata } from "next";

import categoryApi from "@/apis/category.api";
import CategoryForm from "@/app/categories/components/category-form";

export const metadata: Metadata = {
  title: "Interested Category | BK Sharing",
  description: "Choose your interested category",
};

const InterestedCategory = async () => {
  const {
    payload: { data: categories },
  } = await categoryApi.getCategories();

  return (
    <section className="flex-center min-h-[calc(100vh-75px-260px)] py-10 max-sm:px-5">
      <CategoryForm categories={categories} />
    </section>
  );
};
export default InterestedCategory;
