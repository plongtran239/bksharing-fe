import {
  FileTextIcon,
  ListCollapseIcon,
  MessageSquareQuoteIcon,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

import ProfileSection from "@/app/(root)/(user)/users/[id]/components/profile-section";
import Achievement from "@/components/achievement";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Profile | BK Sharing",
  description: "Your profile information",
};

const User = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;

  return (
    <section className="bg-[#f4f2ee]">
      <div className="container flex gap-10 py-10 max-xl:w-full max-xl:flex-col max-sm:px-5">
        {/* Profile */}
        <div className="h-fit w-3/4 max-xl:w-full">
          {/* Background image, Avatar */}
          <div className="rounded-xl bg-white px-3 pb-5 pt-3">
            <div className="relative">
              <div className="relative h-60 w-full">
                <Image
                  src="/images/default-background.png"
                  alt=""
                  fill
                  className="rounded-xl"
                />
              </div>

              <Image
                src="/images/default-user.png"
                alt="Avatar"
                width={100}
                height={100}
                className="absolute -bottom-5 left-10 rounded-full outline outline-4 outline-white"
              />
            </div>

            <div className="flex-between mt-10 px-10 max-xl:flex-col max-xl:space-y-5 max-xl:px-5">
              <div className="max-xl:flex-between max-xl:w-full">
                <h1 className="text-2xl font-bold">{`User ${id}`}</h1>
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
                    <ProfileSection title="About" isAbout>
                      <p className="">
                        Hello, i am Long Tran, i am a developer Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Asperiores
                        quos exercitationem aliquid fuga, iusto perferendis
                        aspernatur laudantium rem sunt? In illo velit, laborum
                        atque beatae expedita iste blanditiis quia odit? Lorem
                        ipsum dolor sit amet consectetur, adipisicing elit.
                        Eaque asperiores nulla voluptate quidem nam atque magnam
                        suscipit saepe, ea molestias quos nostrum voluptatem
                        ipsam repellendus dolores est et doloremque soluta.
                      </p>
                    </ProfileSection>

                    <Separator className="mt-5" />

                    {/* Education */}
                    <ProfileSection title="Education">
                      <div className="space-y-5">
                        <Achievement
                          field="Software Engineering"
                          organization="University of Information Technology (UIT)"
                          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis."
                          startDate="2021"
                          endDate="2025"
                        />

                        <Achievement
                          field="Software Engineering"
                          organization="University of Information Technology (UIT)"
                          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis."
                          startDate="2021"
                          endDate="2025"
                        />
                      </div>
                    </ProfileSection>

                    <Separator className="mt-5" />

                    {/* Experience */}
                    <ProfileSection title="Experience">
                      <div className="space-y-5">
                        <Achievement
                          field="Frontend Developer"
                          organization="BK Sharing"
                          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis."
                          startDate="2021"
                          endDate="2025"
                        />

                        <Achievement
                          field="Frontend Developer"
                          organization="BK Sharing"
                          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis."
                          startDate="2021"
                          endDate="2025"
                        />
                      </div>
                    </ProfileSection>

                    <Separator className="mt-5" />

                    {/* Certifications */}
                    <ProfileSection title="Certifications">
                      <div className="space-y-5">
                        <Achievement
                          field="AWS Cloud Certification"
                          organization="Amazon Web Services (AWS)"
                          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis."
                          startDate="2021"
                          endDate="2025"
                        />

                        <Achievement
                          field="AWS Cloud Certification"
                          organization="Amazon Web Services (AWS)"
                          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis."
                          startDate="2021"
                          endDate="2025"
                        />
                      </div>
                    </ProfileSection>
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
