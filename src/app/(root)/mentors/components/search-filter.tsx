"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilter = () => {
  const router = useRouter();

  const [searchName, setSearchName] = useState("");

  const handleSearchByName = () => {
    router.replace(`/mentors?name=${searchName}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.replace(`/mentors?name=${searchName}`);
    }
  };

  return (
    <div className="flex-center gap-5 rounded-xl border border-primary bg-white p-5 shadow-xl max-xl:flex-col">
      <div>
        <Select
          onValueChange={(value) => {
            router.replace(`/mentors?sortOrder=${value}`);
          }}
          defaultValue="desc"
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">
              Sắp xếp theo đánh giá (tăng dần)
            </SelectItem>
            <SelectItem value="desc">
              Sắp xếp theo đánh giá (giảm dần)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full">
        <Input
          placeholder="Tìm kiếm gia sư..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />

        {searchName !== "" && (
          <button
            onClick={() => {
              setSearchName("");
              router.replace("/mentors");
            }}
            className="absolute -top-[-50%] right-3 -translate-y-[50%] rounded-full bg-gray-300 text-white hover:bg-red-400"
          >
            <XIcon size={12} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-end max-xl:w-full">
        <Button onClick={handleSearchByName} className="px-5">
          Tìm kiếm
          <SearchIcon size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
export default SearchFilter;
