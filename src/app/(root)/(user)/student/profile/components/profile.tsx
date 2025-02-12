import { FileTextIcon, SquareLibraryIcon } from "lucide-react";

import studentApi from "@/apis/student.api";
import CourseTab from "@/app/(root)/(user)/student/profile/components/course-tab";
import ProfileHeading from "@/app/(root)/(user)/student/profile/components/profile-heading";
import ProfileTab from "@/app/(root)/(user)/student/profile/components/profile-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const Profile = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data: user },
  } = await studentApi.getProfile(sessionToken);

  return (
    <div className="col-span-3 h-fit max-xl:w-full">
      <div className="rounded-xl bg-white px-3 pb-5 pt-3">
        {/* Background, Avatar */}
        <ProfileHeading
          name={user.name}
          avatarUrl={user.thumbnail?.originalUrl}
          accountId={user.accountId}
        />

        {/* User info */}
        <div className="flex-between mt-10 px-10">
          {/* <div className="flex-1"></div>

          <div className="flex-center flex-col">
            <div className="mb-2 flex gap-2 text-sm">
              Hoàn thành: <span>{100}%</span>
            </div>
            <Progress value={100} className="w-[200px]" />
          </div>

          <div className="flex flex-1 justify-end"></div> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-center mt-5 w-full">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex-center">
            <TabsList className="gap-2">
              <TabsTrigger value="profile">
                <FileTextIcon size={16} className="max-sm:hidden" />
                Hồ sơ
              </TabsTrigger>

              <TabsTrigger value="courses">
                <SquareLibraryIcon size={16} className="max-sm:hidden" />
                Khóa học
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-5 w-full">
            <TabsContent value="profile">
              <ProfileTab user={user} />
            </TabsContent>

            <TabsContent value="courses">
              <CourseTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
export default Profile;
