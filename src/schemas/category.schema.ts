import { z } from "zod";

const Category = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  parentCategoryId: z.number().optional(),
  noOfCourses: z.number(),
  childCategories: z.array(z.lazy((): z.ZodTypeAny => Category)),
});

const InterestedCategoryRequest = z.object({
  categoryIds: z
    .array(z.number())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

const CategoryRequest = Category.pick({
  name: true,
  description: true,
  parentCategoryId: true,
});

type CategoryType = z.infer<typeof Category>;

type InterestedCategoryRequestType = z.infer<typeof InterestedCategoryRequest>;

type CategoryRequestType = z.infer<typeof CategoryRequest>;

export {
  Category,
  type CategoryType,
  InterestedCategoryRequest,
  type InterestedCategoryRequestType,
  CategoryRequest,
  type CategoryRequestType,
};
