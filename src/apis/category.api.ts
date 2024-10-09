import http from "@/lib/http";
import { CategoryResponseType } from "@/schemas/category";

const categoryApi = {
  getCategories: () =>
    http.get<CategoryResponseType>("/client/categories", {
      cache: "no-store",
    }),

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
