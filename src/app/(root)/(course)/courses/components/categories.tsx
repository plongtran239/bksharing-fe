import categoryApi from "@/apis/category.api";
import CategoryList from "@/app/(root)/(course)/courses/components/category-list";

const Categories = async () => {
  const {
    payload: { data: categories },
  } = await categoryApi.getCategories();

  return <CategoryList categories={categories} />;
};
export default Categories;
