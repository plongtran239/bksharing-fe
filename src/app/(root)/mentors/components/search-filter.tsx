"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchFilter = () => {
  return (
    <div className="flex-center gap-5 rounded-xl border border-primary bg-white p-5 shadow-xl max-xl:flex-col">
      <div className="w-full">
        <Input placeholder="Search by mentor name..." />
      </div>

      <div className="flex items-center justify-end max-xl:w-full">
        <Button>Apply</Button>
      </div>
    </div>
  );
};
export default SearchFilter;
