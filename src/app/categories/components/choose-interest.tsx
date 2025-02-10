"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import categoryApi from "@/apis/category.api";
import CategoryForm from "@/app/categories/components/category-form";
import { useToast } from "@/hooks/use-toast";
import ProgressLayout from "@/layouts/progress.layout";
import {
  CategoryType,
  InterestedCategoryRequest,
  InterestedCategoryRequestType,
} from "@/schemas";

const ChooseInterest = ({ categories }: { categories: CategoryType[] }) => {
  const allCategories = categories.reduce<{ id: number; name: string }[]>(
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

  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm<InterestedCategoryRequestType>({
    resolver: zodResolver(InterestedCategoryRequest),
    defaultValues: {
      categoryIds: [],
    },
  });

  const handleChooseInterests = async () => {
    try {
      setIsLoading(true);
      await categoryApi.selectInterestedCategory({
        categoryIds: form.getValues("categoryIds"),
      });

      toast({
        title: "Success",
        description: "Select interested field successfully!",
      });

      router.push("/courses");
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProgressLayout
      step={step}
      setStep={setStep}
      totalSteps={1}
      isDisabledNext={() => !form.formState.isDirty}
      handleFinish={handleChooseInterests}
      isLoading={isLoading}
    >
      <div className="h-[calc(100vh-75px-4px-77px)] py-10">
        <CategoryForm categories={allCategories} form={form} />
      </div>
    </ProgressLayout>
  );
};
export default ChooseInterest;
