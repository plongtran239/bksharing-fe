"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";

import ProfileSection from "@/app/(root)/(user)/users/[slug]/components/profile-section";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { classifyAchievements } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { MentorType } from "@/schemas";

const ProfileTab = ({
  data,
  completion,
}: {
  data: MentorType;
  completion: number;
}) => {
  const { user } = useAppContext();

  const [educations, experiences, certifications] = classifyAchievements(
    data.achievements
  );

  const isOwnProfile = user?.id === data.accountId;

  return (
    <div className="rounded-xl bg-white p-5">
      {/* Warning */}
      {completion < 100 && isOwnProfile && (
        <div className="mb-5 rounded bg-[#FFF2CC] p-3 text-sm outline outline-1 outline-[#D6B656]">
          Hoàn thiện hồ sơ của bạn để được xét duyệt bao gồm 3 phần:
          <p>- Giới thiệu</p>
          <p>- Học vấn</p>
          <p>- Kinh nghiệm</p>
        </div>
      )}

      {/* About */}
      <ProfileSection
        title="Giới thiệu"
        bio={data.bio}
        type="ABOUT"
        mentorId={data.id}
        isOwnProfile={isOwnProfile}
      />

      <Separator className="mt-5" />

      {/* Education */}
      <ProfileSection
        title="Học vấn"
        achievements={educations}
        type={ACHIEVEMENT_TYPES.EDUCATION}
        mentorId={data.id}
        isOwnProfile={isOwnProfile}
      />

      <Separator className="mt-5" />

      {/* Experience */}
      <ProfileSection
        title="Kinh nghiệm"
        achievements={experiences}
        type={ACHIEVEMENT_TYPES.EXPERIENCE}
        mentorId={data.id}
        isOwnProfile={isOwnProfile}
      />

      <Separator className="mt-5" />

      {/* Certifications */}
      <ProfileSection
        title="Chứng chỉ"
        achievements={certifications}
        type={ACHIEVEMENT_TYPES.CERTIFICATION}
        mentorId={data.id}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
};
export default ProfileTab;
