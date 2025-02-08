"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchCourseInput = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const courseName = searchParams.get("courseName") || "";

  const [search, setSearch] = useState<string>(courseName);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/courses?courseName=${search}`);
    }
  };

  return (
    <div className="flex-between flex-1 gap-2">
      <div className="relative w-full">
        <Input
          className="bg-white"
          placeholder="tìm kiếm khóa học"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />

        {search !== "" && (
          <button
            onClick={() => {
              setSearch("");
              router.push("/courses");
            }}
            className="absolute -top-[-50%] right-3 -translate-y-[50%] rounded-full bg-gray-300 text-white hover:bg-red-400"
          >
            <XIcon size={12} />
          </button>
        )}
      </div>
      <Button
        className="p-3"
        onClick={() => router.push(`/courses?courseName=${search}`)}
      >
        <SearchIcon size={16} />
      </Button>
    </div>
  );
};
export default SearchCourseInput;
