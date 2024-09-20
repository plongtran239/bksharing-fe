import http from "@/http";
import { CategoryResType } from "@/schemas/category.schema";

const categoryApi = {
  getCategoryList: () => http.get<CategoryResType>("/client/categories"),

  selectInterestedCategory: (body: { categoryIds: number[] }) =>
    http.post("/client/categories/students", body),
};

export default categoryApi;
