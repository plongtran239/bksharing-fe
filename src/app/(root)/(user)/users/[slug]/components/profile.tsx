import {
  FileTextIcon,
  MessageSquareQuoteIcon,
  SquareLibraryIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import meetingApi from "@/apis/meeting.api";
import ChatButton from "@/app/(root)/(user)/users/[slug]/components/chat-button";
import CourseTab from "@/app/(root)/(user)/users/[slug]/components/course-tab";
import FeedbackTab from "@/app/(root)/(user)/users/[slug]/components/feedback-tab";
import ProfileHeading from "@/app/(root)/(user)/users/[slug]/components/profile-heading";
import ProfileTab from "@/app/(root)/(user)/users/[slug]/components/profile-tab";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LOCALE } from "@/constants/date";
import {
  ACHIEVEMENT_TYPES,
  MEETING_STATUS,
  MEETING_TYPE,
  MENTOR_STATUS,
} from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { useGetProfile } from "@/hooks/use-get-profile";
import { convertMilisecondsToLocaleString } from "@/lib/utils";

const Profile = async ({ slug }: { slug: string }) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const result = await useGetProfile(slug);

  const {
    payload: { data: interview },
  } = await meetingApi.getClientMeetings(sessionToken, MEETING_TYPE.INTERVIEW);

  if (!result) {
    notFound();
  }

  const { name, bio, achievements, thumbnail, accountId, status } = result.data;

  const handleCalculateProfileCompletion = () => {
    const totalSections = 4;
    const sectionWeight = 100 / totalSections;

    const completedSections = [
      bio,
      name,
      achievements.filter(
        (achievement) => achievement.type === ACHIEVEMENT_TYPES.EDUCATION
      ).length,
      achievements.filter(
        (achievement) => achievement.type === ACHIEVEMENT_TYPES.EXPERIENCE
      ).length,
    ].filter(Boolean).length;

    return completedSections * sectionWeight;
  };

  const completion = handleCalculateProfileCompletion();

  return (
    <div className="col-span-3 h-fit max-xl:w-full">
      <div className="rounded-xl bg-white px-3 pb-5 pt-3">
        {/* Background, Avatar */}
        <ProfileHeading
          name={name}
          avatarUrl={thumbnail?.originalUrl}
          accountId={accountId}
        />

        {/* User info */}
        <div className="flex-between mt-10 px-10">
          <div className="flex-1">
            {interview.length > 0 &&
              interview[0].status !== MEETING_STATUS.FINISHED &&
              status === MENTOR_STATUS.PENDING && (
                <div className="block text-primary">
                  <p className="text-foreground">Bạn có lịch phỏng vấn vào </p>
                  <p>
                    {convertMilisecondsToLocaleString(
                      interview[0].startsAt,
                      LOCALE,
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                      }
                    )}
                  </p>
                </div>
              )}
          </div>

          <div className="flex-center flex-col">
            <div className="mb-2 flex gap-2 text-sm">
              Hoàn thành: <span>{completion}%</span>
            </div>
            <Progress value={completion} className="w-[200px]" />
          </div>

          <div className="flex flex-1 justify-end">
            {status === MENTOR_STATUS.ACCEPTED && (
              <ChatButton accountId={accountId} />
            )}

            {interview.length > 0 &&
              interview[0].status === MEETING_STATUS.ONGOING &&
              status === MENTOR_STATUS.PENDING && (
                <Link href={`/meeting/${interview[0].cid}`}>
                  <Button>Tham gia phòng</Button>
                </Link>
              )}

            {interview.length > 0 &&
              interview[0].status === MEETING_STATUS.SCHEDULED &&
              status === MENTOR_STATUS.PENDING && (
                <Button disabled>Chưa diễn ra</Button>
              )}
          </div>
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

              <TabsTrigger value="reviews">
                <MessageSquareQuoteIcon size={16} className="max-sm:hidden" />
                Đánh giá
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-5 w-full">
            <TabsContent value="profile">
              <ProfileTab data={result.data} completion={completion} />
            </TabsContent>

            <TabsContent value="courses">
              <CourseTab
                mentorId={result.data.id}
                isAccepted={result.data.status === MENTOR_STATUS.ACCEPTED}
              />
            </TabsContent>

            <TabsContent value="reviews">
              <FeedbackTab mentorId={result.data.id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
export default Profile;
