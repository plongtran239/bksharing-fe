"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CategoryType } from "@/schemas";

const Categories = ({
  categories,
  categoryFilter,
  setCategoryFilter,
  loading,
}: {
  categories: CategoryType[];
  categoryFilter: CategoryType[];
  setCategoryFilter: Dispatch<SetStateAction<CategoryType[]>>;
  loading: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);

  if (loading) {
    return (
      <div className="h-96">
        <Loader />;
      </div>
    );
  }

  return (
    <div className="mt-5 w-full">
      <div>
        {showMore
          ? categories.map((category, index) => (
              <div key={category.id}>
                {index !== 0 && <Separator className="my-2" />}

                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="w-full hover:bg-secondary">
                    <div className="flex-between">
                      <p className="text-left font-semibold">{category.name}</p>

                      <ChevronsUpDownIcon size={20} />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <ul className="mt-2 space-y-1">
                      {category.childCategories.map((childCategory) => (
                        <li key={childCategory.id} className="">
                          <Checkbox
                            id={`checkbox-${childCategory.id}`}
                            checked={categoryFilter.some(
                              (category) => category.id === childCategory.id
                            )}
                            onCheckedChange={(e) => {
                              console.log(e);
                              if (e) {
                                setCategoryFilter((prev) => [
                                  ...prev,
                                  childCategory,
                                ]);
                              } else {
                                setCategoryFilter((prev) =>
                                  prev.filter(
                                    (category) =>
                                      category.id !== childCategory.id
                                  )
                                );
                              }
                            }}
                          />
                          <Label
                            className="ml-2 w-full"
                            htmlFor={`checkbox-${childCategory.id}`}
                          >
                            {childCategory.name} ({childCategory.noOfCourses})
                          </Label>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))
          : categories.slice(0, 5).map((category, index) => (
              <div key={category.id}>
                {index !== 0 && <Separator className="my-2" />}

                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="w-full hover:bg-secondary">
                    <div className="flex-between">
                      <p className="text-left font-semibold">{category.name}</p>

                      <ChevronsUpDownIcon size={20} />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <ul className="mt-2 space-y-1">
                      {category.childCategories.map((childCategory) => (
                        <li key={childCategory.id} className="">
                          <Checkbox
                            id={`checkbox-${childCategory.id}`}
                            checked={categoryFilter.some(
                              (category) => category.id === childCategory.id
                            )}
                            onCheckedChange={(e) => {
                              if (e) {
                                setCategoryFilter((prev) => [
                                  ...prev,
                                  childCategory,
                                ]);
                              } else {
                                setCategoryFilter((prev) =>
                                  prev.filter(
                                    (category) =>
                                      category.id !== childCategory.id
                                  )
                                );
                              }
                            }}
                          />
                          <Label
                            className="ml-2 w-full"
                            htmlFor={`checkbox-${childCategory.id}`}
                          >
                            {childCategory.name} ({childCategory.noOfCourses})
                          </Label>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
      </div>

      <Separator className="my-2" />

      <div className="flex-center">
        <Button onClick={() => setShowMore(!showMore)} variant="link">
          {showMore ? "Thu gọn" : `Hiển thị thêm (${categories.length - 5})`}
        </Button>
      </div>
    </div>
  );
};
export default Categories;
