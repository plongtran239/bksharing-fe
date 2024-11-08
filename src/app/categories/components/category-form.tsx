"use client";

import { UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InterestedCategoryRequestType } from "@/schemas";

interface ICategoryFormProps {
  categories: {
    id: number;
    name: string;
  }[];
  form: UseFormReturn<InterestedCategoryRequestType>;
}

const CategoryForm = ({ categories, form }: ICategoryFormProps) => {
  return (
    <Form {...form}>
      <form className="flex-center flex-col space-y-8 rounded-xl">
        <FormField
          control={form.control}
          name="categoryIds"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-3xl font-semibold text-secondary-foreground">
                  Your Interested Field
                </FormLabel>
                <FormDescription className="text-lg">
                  Choose the field that interests you
                </FormDescription>
              </div>
              {categories.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="categoryIds"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default CategoryForm;
