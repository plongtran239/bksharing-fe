"use client";

import { useEffect, useState } from "react";

import studentApi from "@/apis/student.api";
import ProfileSection from "@/app/(root)/(user)/student/profile/components/profile-section";
import Loader from "@/components/loader";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { AchivementType } from "@/schemas";

const ProfileTab = () => {
  const [loading, setLoading] = useState(false);

  const [achievements, setAchievements] = useState<AchivementType[]>([]);

  useEffect(() => {
    const getStudentAchievements = async () => {
      try {
        setLoading(true);
        const {
          payload: { data },
        } = await studentApi.getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    };

    getStudentAchievements();
  }, []);

  if (loading || !achievements) {
    return <Loader />;
  }

  return (
    <div className="space-y-5 rounded-xl bg-white p-5">
      <ProfileSection
        title="Học vấn"
        achievements={achievements.filter(
          (achievement) => achievement.type === ACHIEVEMENT_TYPES.EDUCATION
        )}
        type={ACHIEVEMENT_TYPES.EDUCATION}
        isOwnProfile={true}
        studentId={269}
      />

      <ProfileSection
        title="Kinh nghiệm"
        achievements={achievements.filter(
          (achievement) => achievement.type === ACHIEVEMENT_TYPES.EXPERIENCE
        )}
        type={ACHIEVEMENT_TYPES.EXPERIENCE}
        isOwnProfile={true}
        studentId={269}
      />

      <ProfileSection
        title="Chứng chỉ"
        achievements={achievements.filter(
          (achievement) => achievement.type === ACHIEVEMENT_TYPES.CERTIFICATION
        )}
        type={ACHIEVEMENT_TYPES.CERTIFICATION}
        isOwnProfile={true}
        studentId={269}
      />
    </div>
  );
};
export default ProfileTab;
