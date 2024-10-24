import { Metadata } from "next";
import Image from "next/image";

import Profile from "@/app/(root)/(user)/users/[slug]/components/profile";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Profile | BK Sharing",
  description: "Your profile information",
};

const User = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  return (
    <section className="bg-[#f4f2ee]">
      <div className="container flex gap-10 py-10 max-xl:w-full max-xl:flex-col max-sm:px-5">
        {/* Profile */}
        <Profile slug={slug} />

        {/* Suggestion */}
        <div className="h-fit w-1/4 rounded-xl bg-white p-5 max-xl:w-full max-xl:px-5">
          <p className="text-lg font-semibold">You might like</p>

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
      </div>
    </section>
  );
};
export default User;
