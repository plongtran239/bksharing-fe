import { Metadata } from "next";

import categoryApi from "@/apis/category.api";
import ChooseInterest from "@/app/categories/components/choose-interest";

export const metadata: Metadata = {
  title: "Interested Category | BK Sharing",
  description: "Choose your interested category",
};

const InterestedCategory = async () => {
  const {
    payload: { data: categories },
  } = await categoryApi.getCategories();

  return <ChooseInterest categories={categories} />;
};
export default InterestedCategory;
