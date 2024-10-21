"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import categoryApi from "@/apis/category.api";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import {
  CategoryType,
  InterestedCategoryRequest,
  InterestedCategoryRequestType,
} from "@/schemas";

interface ICategoryFormProps {
  categories: CategoryType[];
}

const CategoryForm = ({ categories }: ICategoryFormProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<InterestedCategoryRequestType>({
    resolver: zodResolver(InterestedCategoryRequest),
    defaultValues: {
      categoryIds: [],
    },
  });

  const onSubmit = async (values: InterestedCategoryRequestType) => {
    try {
      await categoryApi.selectInterestedCategory({
        categoryIds: values.categoryIds,
      });

      toast({
        title: "Success",
        description: "Select interested field successfully!",
      });

      router.push("/");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-xl p-10 shadow-xl"
      >
        <FormField
          control={form.control}
          name="categoryIds"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-3xl text-primary">
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

        <div className="flex-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
export default CategoryForm;
