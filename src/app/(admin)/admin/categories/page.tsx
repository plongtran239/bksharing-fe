import { cookies } from "next/headers";

import categoryApi from "@/apis/category.api";
import AddCategoryButton from "@/app/(admin)/admin/categories/components/add-category-button";
import CategoryTable from "@/app/(admin)/admin/categories/components/category-table";
import { Separator } from "@/components/ui/separator";

const AdminCategory = async () => {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("sessionToken")?.value;

  const { payload } = await categoryApi.getAdminCategories(
    sessionToken as string
  );
  return (
    <main>
      <div className="flex-between">
        <h1 className="text-2xl font-semibold text-primary">Category List</h1>

        <AddCategoryButton categories={payload.data} />
      </div>

      <Separator className="my-5" />

      <CategoryTable data={payload.data} />
    </main>
  );
};
export default AdminCategory;
