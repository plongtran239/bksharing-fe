"use client";

import {
  BookCopyIcon,
  DollarSignIcon,
  GraduationCapIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import dashboardApi from "@/apis/dashboard.api";
import OverviewCard from "@/app/(admin)/admin/dashboard/components/overview-card";
import { DashboardOverviewType } from "@/schemas/dashboard.schema";

export enum OVERVIEW_TYPE {
  MENTORS = "MENTORS",
  STUDENTS = "STUDENTS",
  COURSES = "COURSES",
  SUBSCRIPTIONS = "SUBSCRIPTIONS",
  REVENUE = "REVENUE",
}

const Overview = () => {
  const [overview, setOverview] = useState<DashboardOverviewType | undefined>();

  useEffect(() => {
    async function fetchData() {
      const {
        payload: { data },
      } = await dashboardApi.overview();

      setOverview(data);
    }

    fetchData();
  }, []);

  if (!overview) return null;

  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <OverviewCard
          icon={<GraduationCapIcon size={24} className="text-white" />}
          data={overview.totalMentors}
          type={OVERVIEW_TYPE.MENTORS}
        />

        <OverviewCard
          icon={<UserIcon size={24} className="text-white" />}
          data={overview.totalStudents}
          type={OVERVIEW_TYPE.STUDENTS}
        />

        <OverviewCard
          icon={<BookCopyIcon size={24} className="text-white" />}
          data={overview.totalCourses}
          type={OVERVIEW_TYPE.COURSES}
        />

        <OverviewCard
          icon={<UserPlusIcon size={24} className="text-white" />}
          data={overview.totalSubscriptions}
          type={OVERVIEW_TYPE.SUBSCRIPTIONS}
        />

        <OverviewCard
          icon={<DollarSignIcon size={24} className="text-white" />}
          data={Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(overview.revenue)}
          type={OVERVIEW_TYPE.REVENUE}
        />
      </div>
    </div>
  );
};
export default Overview;
