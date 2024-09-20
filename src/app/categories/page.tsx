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
  } = await categoryApi.getCategoryList();

  return (
    <section className="flex-center mt-20">
      <CategoryForm categories={categories} />
    </section>
  );
};
export default InterestedCategory;
