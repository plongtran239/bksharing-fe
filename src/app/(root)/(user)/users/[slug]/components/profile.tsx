import {
  FileTextIcon,
  ListCollapseIcon,
  MessageSquareQuoteIcon,
} from "lucide-react";

import ProfileHeading from "@/app/(root)/(user)/users/[slug]/components/profile-heading";
import ProfileTab from "@/app/(root)/(user)/users/[slug]/components/profile-tab";
// import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProfile } from "@/hooks/use-get-profile";
import { classifyAchievements } from "@/lib/utils";

const Profile = async ({ slug }: { slug: string }) => {
  const { data: profile } = await useGetProfile(slug);

  const { name, bio, achievements } = profile;

  const classifiedAchievements = classifyAchievements(achievements);

  const handleCalculateProfileCompletion = () => {
    const totalSections = 5;
    const sectionWeight = 100 / totalSections;

    const completedSections = [
      bio,
      name,
      ...classifiedAchievements.map((achievement) => achievement.length),
    ].filter(Boolean).length;

    return completedSections * sectionWeight;
  };

  const completion = handleCalculateProfileCompletion();

  return (
    <div className="h-fit w-3/4 max-xl:w-full">
      <div className="rounded-xl bg-white px-3 pb-5 pt-3">
        {/* Background, Avatar */}
        <ProfileHeading name={name} />

        {/* User info */}
        <div className="mt-5 grid grid-cols-3">
          <div className="max-lg:flex-center max-w-[400px]">
            {/* <h1 className="line-clamp-1 text-2xl font-bold">{data.name}</h1> */}
          </div>

          <div className="">
            <div className="flex-center flex-col">
              <div className="mb-2 flex gap-2 text-sm">
                completion: <span>{completion}%</span>
              </div>
              <Progress value={completion} className="w-[200px]" />
            </div>
          </div>

          {/* <div className="flex justify-end">
            <Button className="" size="default">
              My Schedule
            </Button>
          </div> */}
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
                <MessageSquareQuoteIcon size={16} className="max-sm:hidden" />
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
              <ProfileTab data={profile} />
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
  );
};
export default Profile;
