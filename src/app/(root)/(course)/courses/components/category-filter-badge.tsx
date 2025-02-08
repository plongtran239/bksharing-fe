import { XIcon } from "lucide-react";

import { CategoryType } from "@/schemas";

const CategoryFilterBadge = ({
  category,
  handleRemoveFilter,
}: {
  category: CategoryType;
  handleRemoveFilter: (categoryId: number) => void;
}) => {
  return (
    <div
      className="flex items-center gap-1 rounded-full border border-primary p-1 px-3 text-sm capitalize hover:bg-secondary hover:text-secondary-foreground"
      onClick={() => handleRemoveFilter(category.id)}
    >
      {category.name} ({category.noOfCourses})
      <XIcon size={16} />
    </div>
  );
};
export default CategoryFilterBadge;
