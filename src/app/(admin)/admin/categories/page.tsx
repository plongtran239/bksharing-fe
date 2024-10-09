import { cookies } from "next/headers";

import categoryApi from "@/apis/category.api";
import CategoryTable from "@/app/(admin)/admin/categories/components/category-table";

const AdminCategory = async () => {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("sessionToken")?.value;

  const { payload } = await categoryApi.getAdminCategories(
    sessionToken as string
  );
  return <CategoryTable data={payload.data} />;
};
export default AdminCategory;
