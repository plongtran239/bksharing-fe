import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import categoryApi from "@/apis/category.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseRequestType } from "@/schemas";

const ChooseCategory = ({
  form,
}: {
  form: UseFormReturn<CourseRequestType>;
}) => {
  const [categories, setCategories] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const {
        payload: { data },
      } = await categoryApi.getCategories();

      const allCategories = data.reduce<{ id: number; name: string }[]>(
        (acc, category) => {
          if (category.childCategories.length === 0) {
            acc.push({ id: category.id, name: category.name });
          } else {
            category.childCategories.forEach((childCategory) => {
              acc.push({ id: childCategory.id, name: childCategory.name });
            });
          }
          return acc;
        },
        []
      );

      setCategories(allCategories);
    };
    fetchCategories();
  }, []);

  return (
    <div className="container space-y-10 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-secondary-foreground">
          Danh mục phù hợp nhất với khóa học của bạn
        </h1>

        <p className="text-center text-black">
          Nếu không chắn chắn, bạn có thể đổi lại sau.
        </p>
      </div>

      <div className="flex-center">
        <Select
          defaultValue={
            form.getValues("categoryId")
              ? form.getValues("categoryId").toString()
              : ""
          }
          onValueChange={(value) => form.setValue("categoryId", Number(value))}
        >
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Chọn danh mục"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default ChooseCategory;
