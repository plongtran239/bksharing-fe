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
import { CategoryType, CourseType } from "@/schemas";

const ChooseCategory = ({ form }: { form: UseFormReturn<CourseType> }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const {
        payload: { data },
      } = await categoryApi.getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="container space-y-10 text-center">
      <h1 className="text-3xl font-semibold text-secondary-foreground">
        What category best fits the knowledge you&apos;ll share?
      </h1>

      <p className="text-center text-black">
        If you&apos;re not sure about the right category, you can change it
        later.
      </p>

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
            <SelectValue placeholder="Choose a category"></SelectValue>
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
