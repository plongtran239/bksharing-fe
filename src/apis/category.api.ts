import http from "@/lib/http";
import { CategoryRequestType, CategoryType, ListResponseType } from "@/schemas";

const categoryApi = {
  getCategories: () =>
    http.get<ListResponseType<CategoryType>>("/client/categories", {
      cache: "no-store",
    }),

  createCategory: (body: CategoryRequestType) =>
    http.post("/admin/categories", body),

  updateCategory: (categoryId: number, body: CategoryRequestType) =>
    http.patch(`/admin/categories/${categoryId}`, body),

  deleteCategory: (categoryId: number) =>
    http.delete(`/admin/categories/${categoryId}`),

  getAdminCategories: (sessionToken: string) =>
    http.get<ListResponseType<CategoryType>>("/admin/categories", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    }),

  selectInterestedCategory: (body: { categoryIds: number[] }) =>
    http.post("/client/categories/students", body),
};

export default categoryApi;
