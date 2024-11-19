"use client";

import Image from "next/image";

import { ChangeLanguage } from "@/actions/language.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const LangSwitcher = ({ lang }: { lang: string }) => {
  return (
    <Select onValueChange={(e) => ChangeLanguage(e)} value={lang}>
      <SelectTrigger
        className="w-fit border-none px-0 shadow-none"
        haveIcon={false}
      >
        <div className="relative h-7 w-7">
          <Image
            src={lang === "vi" ? "/images/cl_vi.png" : "/images/cl_en.png"}
            alt=""
            fill
            className="rounded-full"
            sizes="100%"
          />
        </div>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="vi">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <Image
                src="/images/cl_vi.png"
                alt=""
                fill
                className="rounded-full"
                sizes="100%"
              />
            </div>
            Tiếng Việt
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <Image
                src="/images/cl_en.png"
                alt=""
                fill
                className="rounded-full"
                sizes="100%"
              />
            </div>
            <p>English</p>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
export default LangSwitcher;
