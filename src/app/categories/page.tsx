import categoryApi from "@/apis/category.api";
import CategoryForm from "@/app/categories/components/category-form";

const InterestedCategory = async () => {
  const {
    payload: { data: categories },
  } = await categoryApi.getCategoryList();

  return (
    <div className="flex-center mt-20">
      <CategoryForm categories={categories} />
    </div>
  );
};
export default InterestedCategory;
