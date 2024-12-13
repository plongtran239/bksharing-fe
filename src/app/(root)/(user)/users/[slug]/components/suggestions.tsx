"use client";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";

const Suggestions = () => {
  const { user } = useAppContext();

  if (user && user.accountType === ROLES.MENTOR) {
    return null;
  }

  return (
    <div className="col-auto h-fit rounded-xl bg-white p-5 max-xl:w-full max-xl:px-5">
      <p className="text-lg font-semibold">Có thể bạn quan tâm</p>

      <Separator className="my-3" />

      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="">
          <div>
            <div className="flex items-center gap-5">
              <div className="relative h-8 w-8">
                <Image
                  src="/images/default-user.png"
                  alt="Avatar"
                  fill
                  className="rounded-full"
                  sizes="(max-width: 640px) 100px,"
                />
              </div>

              <div className="w-2/3">
                <p className="font-semibold">Nguyen Van A</p>
                <span className="font line-clamp-2 text-sm text-[#5B5B5B]">
                  Software Engineer at ABC Company
                </span>
              </div>
            </div>

            <Separator className="my-3" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Suggestions;
