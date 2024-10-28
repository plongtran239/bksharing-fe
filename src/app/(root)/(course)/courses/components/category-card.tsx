import { Grid2X2Icon } from "lucide-react";

const CategoryCard = () => {
  return (
    <div className="space-y-5 rounded-xl border border-primary p-5 text-center shadow-xl transition-all hover:scale-105">
      <div className="flex-center text-secondary-foreground">
        <div className="rounded-full bg-secondary p-3">
          <Grid2X2Icon size={24} />
        </div>
      </div>

      <p className="font-semibold text-primary">Design</p>

      <p className="line-clamp-4 text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est iure
        maxime modi distinctio sint? Accusamus aut id assumenda, pariatur
        accusantium quibusdam laboriosam nostrum nobis laborum omnis cum
        excepturi voluptatum quis!
      </p>
    </div>
  );
};
export default CategoryCard;
