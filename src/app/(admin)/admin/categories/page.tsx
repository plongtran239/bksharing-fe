import categoryApi from "@/apis/category.api";
import AddCategoryButton from "@/app/(admin)/admin/categories/components/add-category-button";
import CategoryTable from "@/app/(admin)/admin/categories/components/category-table";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const AdminCategory = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const { payload } = await categoryApi.getAdminCategories(sessionToken);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Category List</h1>

        <AddCategoryButton categories={payload.data} />
      </div>

      <Separator className="my-5" />

      <CategoryTable data={payload.data} />
    </main>
  );
};
export default AdminCategory;
