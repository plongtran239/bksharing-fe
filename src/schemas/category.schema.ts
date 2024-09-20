import { z } from "zod";

const Category = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  parentCategoryId: z.number().nullable(),
  childCategories: z.array(z.number()),
});

const CategoryRes = z.object({
  data: z.array(Category),
  total: z.number(),
});

type CategoryResType = z.infer<typeof CategoryRes>;

type CategoryType = z.infer<typeof Category>;

export { CategoryRes, type CategoryResType, Category, type CategoryType };
