import http from "@/lib/http";
import { CategoryResponseType } from "@/schemas/category";

const categoryApi = {
  getCategories: () =>
    http.get<CategoryResponseType>("/client/categories", {
      cache: "no-store",
    }),

  createCategory: (body: {
    name: string;
    description: string;
    parentCategoryId?: number;
  }) => http.post("/admin/categories", body),

  updateCategory: (
    categoryId: number,
    body: {
      name: string;
      description: string;
      parentCategoryId?: number;
    }
  ) => http.patch(`/admin/categories/${categoryId}`, body),

  deleteCategory: (categoryId: number) =>
    http.delete(`/admin/categories/${categoryId}`),

  getAdminCategories: (sessionToken: string) =>
    http.get<CategoryResponseType>("/admin/categories", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  selectInterestedCategory: (body: { categoryIds: number[] }) =>
    http.post("/client/categories/students", body),
};

export default categoryApi;
