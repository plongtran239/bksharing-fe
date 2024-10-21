import {
  FileTextIcon,
  ListCollapseIcon,
  MessageSquareQuoteIcon,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

import userApi from "@/apis/user.api";
import ProfileHeading from "@/app/(root)/(user)/users/[id]/components/profile-heading";
import ProfileSection from "@/app/(root)/(user)/users/[id]/components/profile-section";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { useGetToken } from "@/hooks/use-get-token";

export const metadata: Metadata = {
  title: "Profile | BK Sharing",
  description: "Your profile information",
};

const User = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;

  const sessionToken = useGetToken();

  const {
    payload: { data },
  } = await userApi.getMentor(sessionToken as string, id);

  if (!data) {
    return (
      <div>
        <p>User not found</p>
      </div>
    );
  }

  const educations = data.achievements.filter(
    (achievement) => achievement.type === ACHIEVEMENT_TYPES.EDUCATION
  );

  const experiences = data.achievements.filter(
    (achievement) => achievement.type === ACHIEVEMENT_TYPES.EXPERIENCE
  );

  const certifications = data.achievements.filter(
    (achievement) => achievement.type === ACHIEVEMENT_TYPES.CERTIFICATION
  );

  return (
    <section className="bg-[#f4f2ee]">
      <div className="container flex gap-10 py-10 max-xl:w-full max-xl:flex-col max-sm:px-5">
        {/* Profile */}
        <div className="h-fit w-3/4 max-xl:w-full">
          <div className="rounded-xl bg-white px-3 pb-5 pt-3">
            {/* Background, Avatar */}
            <ProfileHeading />

            {/* User info */}
            <div className="flex-between mt-10 px-10 max-xl:flex-col max-xl:space-y-5 max-xl:px-5">
              <div className="max-xl:flex-between max-xl:w-full">
                <h1 className="text-2xl font-bold">{data.name}</h1>
                <p className="text-sm">
                  <span className="text-gray-500">Joined:</span> 01/01/2021
                </p>
              </div>

              <div className="">
                <div className="flex-center flex-col">
                  <div className="mb-2 flex gap-2">
                    Your profile completion: <span>20%</span>
                  </div>
                  <Progress value={20} />
                </div>
              </div>

              <div className="">
                <Button className="" size="default">
                  Become Mentor
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex-center mt-10 w-full">
            <Tabs defaultValue="profile" className="w-full">
              <div className="flex-center">
                <TabsList className="gap-2">
                  <TabsTrigger value="profile">
                    <FileTextIcon size={16} className="max-sm:hidden" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    <MessageSquareQuoteIcon
                      size={16}
                      className="max-sm:hidden"
                    />
                    Reviews
                  </TabsTrigger>
                  {/* <TabsTrigger value="suggestions">
                    <ListCheckIcon size={16} className="max-sm:hidden" />
                    Suggestion
                  </TabsTrigger> */}
                  <TabsTrigger value="posts">
                    <ListCollapseIcon size={16} className="max-sm:hidden" />
                    Posts
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="mt-10 w-full">
                <TabsContent value="profile">
                  <div className="rounded-xl bg-white p-5">
                    {/* Warning */}
                    <div className="rounded bg-[#FFF2CC] p-3 text-sm outline outline-1 outline-[#D6B656]">
                      Complete your profile to
                      <span className="font-semibold">
                        {" "}
                        schedule a meeting{" "}
                      </span>
                      with mentors or
                      <span className="font-semibold"> become a mentor</span>.
                    </div>

                    {/* About */}
                    <ProfileSection title="About" bio={data.bio} type="ABOUT" />

                    <Separator className="mt-5" />

                    {/* Education */}
                    <ProfileSection
                      title="Education"
                      achievements={educations}
                      type={ACHIEVEMENT_TYPES.EDUCATION}
                    />

                    <Separator className="mt-5" />

                    {/* Experience */}
                    <ProfileSection
                      title="Experience"
                      achievements={experiences}
                      type={ACHIEVEMENT_TYPES.EXPERIENCE}
                    />

                    <Separator className="mt-5" />

                    {/* Certifications */}
                    <ProfileSection
                      title="Certifications"
                      achievements={certifications}
                      type={ACHIEVEMENT_TYPES.CERTIFICATION}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="mt-5 rounded-xl bg-white p-5">
                    <p>There are no reviews!</p>
                  </div>
                </TabsContent>

                <TabsContent value="suggestions">
                  <div className="mt-5 rounded-xl bg-white p-5">
                    <p>There are no suggestions!</p>
                  </div>
                </TabsContent>

                <TabsContent value="posts">
                  <div className="mt-5 rounded-xl bg-white p-5">
                    <p>There are no posts!</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

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
