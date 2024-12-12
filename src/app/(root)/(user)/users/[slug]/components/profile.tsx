import {
  FileTextIcon,
  MessageSquareQuoteIcon,
  SquareLibraryIcon,
} from "lucide-react";
import { notFound } from "next/navigation";

import CourseTab from "@/app/(root)/(user)/users/[slug]/components/course-tab";
import ProfileHeading from "@/app/(root)/(user)/users/[slug]/components/profile-heading";
import ProfileTab from "@/app/(root)/(user)/users/[slug]/components/profile-tab";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProfile } from "@/hooks/use-get-profile";
import { classifyAchievements } from "@/lib/utils";

const Profile = async ({ slug }: { slug: string }) => {
  const result = await useGetProfile(slug);

  if (!result) {
    notFound();
  }

  const { name, bio, achievements, thumbnail, accountId } = result.data;

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
        <ProfileHeading
          name={name}
          avatarUrl={thumbnail?.originalUrl}
          accountId={accountId}
        />

        {/* User info */}
        <div className="flex-between mt-10">
          <div className="flex-1"></div>

          <div className="flex-center flex-col">
            <div className="mb-2 flex gap-2 text-sm">
              completion: <span>{completion}%</span>
            </div>
            <Progress value={completion} className="w-[200px]" />
          </div>

          <div className="flex-1"></div>
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

              <TabsTrigger value="courses">
                <SquareLibraryIcon size={16} className="max-sm:hidden" />
                Courses
              </TabsTrigger>

              <TabsTrigger value="reviews">
                <MessageSquareQuoteIcon size={16} className="max-sm:hidden" />
                Reviews
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-10 w-full">
            <TabsContent value="profile">
              <ProfileTab data={result.data} completion={completion} />
            </TabsContent>

            <TabsContent value="courses">
              <CourseTab mentorId={result.data.id} />
            </TabsContent>

            <TabsContent value="reviews">
              <div className="mt-5 rounded-xl bg-white p-5">
                <p>There are no reviews!</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
export default Profile;
