import http from "@/http";
import { CategoryResponseType } from "@/schemas/category.schema";

const categoryApi = {
  getCategoryList: () =>
    http.get<CategoryResponseType>("/client/categories", {
      cache: "no-store",
    }),

  selectInterestedCategory: (body: { categoryIds: number[] }) =>
    http.post("/client/categories/students", body),
};

export default categoryApi;
