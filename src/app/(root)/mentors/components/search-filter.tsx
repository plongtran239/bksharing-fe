"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchFilter = () => {
  const router = useRouter();

  const [searchName, setSearchName] = useState("");

  const handleSearchByName = () => {
    router.replace(`/mentors?name=${searchName}`);
  };

  return (
    <div className="flex-center gap-5 rounded-xl border border-primary bg-white p-5 shadow-xl max-xl:flex-col">
      <div className="w-full">
        <Input
          placeholder="Search by mentor name..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
        />
      </div>

      <div className="flex items-center justify-end max-xl:w-full">
        <Button onClick={handleSearchByName}>Apply</Button>
      </div>
    </div>
  );
};
export default SearchFilter;
