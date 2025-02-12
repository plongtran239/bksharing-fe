import ProfileSection from "@/app/(root)/(user)/student/profile/components/profile-section";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { StudentType } from "@/schemas";

const ProfileTab = ({ user }: { user: StudentType }) => {
  const { achievements, id } = user;

  return (
    <div className="space-y-5 rounded-xl bg-white p-5">
      <ProfileSection
        title="Học vấn"
        achievements={achievements.filter(
          (achievement) => achievement.type === ACHIEVEMENT_TYPES.EDUCATION
        )}
        type={ACHIEVEMENT_TYPES.EDUCATION}
        isOwnProfile={true}
        studentId={id}
      />

      <ProfileSection
        title="Kinh nghiệm"
        achievements={achievements.filter(
          (achievement) => achievement.type === ACHIEVEMENT_TYPES.EXPERIENCE
        )}
        type={ACHIEVEMENT_TYPES.EXPERIENCE}
        isOwnProfile={true}
        studentId={id}
      />

      <ProfileSection
        title="Chứng chỉ"
        achievements={achievements.filter(
          (achievement) => achievement.type === ACHIEVEMENT_TYPES.CERTIFICATION
        )}
        type={ACHIEVEMENT_TYPES.CERTIFICATION}
        isOwnProfile={true}
        studentId={id}
      />
    </div>
  );
};
export default ProfileTab;
