import http from "@/lib/http";
import { CategoryResponseType } from "@/schemas/category";

const categoryApi = {
  getCategoryList: () =>
    http.get<CategoryResponseType>("/client/categories", {
      cache: "no-store",
    }),

  selectInterestedCategory: (body: { categoryIds: number[] }) =>
    http.post("/client/categories/students", body),
};

export default categoryApi;
