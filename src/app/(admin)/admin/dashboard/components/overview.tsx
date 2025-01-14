"use client";

import {
  BookCopyIcon,
  DollarSignIcon,
  GraduationCapIcon,
  MessageSquareWarningIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import dashboardApi from "@/apis/dashboard.api";
import { Separator } from "@/components/ui/separator";
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
        {/* Mentor */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <p className="text-secondary-foreground">Gia sư</p>
              <p className="text-xl font-semibold text-secondary-foreground">
                {overview.mentorOverview.approvedMentor}
              </p>
            </div>
            <div className="rounded-full bg-secondary-foreground p-3">
              <GraduationCapIcon size={20} className="text-white" />
            </div>
          </div>

          <Separator className="my-3 bg-secondary-foreground" />

          <div className="flex-between">
            <div>
              <span className="text-secondary-foreground">Chờ duyệt: </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.mentorOverview.pendingMentor}
              </span>
            </div>
          </div>
        </div>

        {/* Course */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <p className="text-secondary-foreground">Khóa học</p>
              <p className="text-xl font-semibold text-secondary-foreground">
                {overview.courseOverview.approvedCourse}
              </p>
            </div>
            <div className="rounded-full bg-secondary-foreground p-3">
              <BookCopyIcon size={20} className="text-white" />
            </div>
          </div>

          <Separator className="my-3 bg-secondary-foreground" />

          <div className="flex-between">
            <div>
              <span className="text-secondary-foreground">Chờ duyệt: </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.courseOverview.pendingCourse}
              </span>
            </div>
            <div>
              <span className="text-secondary-foreground">
                Dừng hoạt động:{" "}
              </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.courseOverview.suspendedCourse}
              </span>
            </div>
          </div>
        </div>

        {/* Student */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <p className="text-secondary-foreground">Học viên</p>
              <p className="text-xl font-semibold text-secondary-foreground">
                {overview.studentOverview.activeStudent}
              </p>
            </div>
            <div className="rounded-full bg-secondary-foreground p-3">
              <UserIcon size={20} className="text-white" />
            </div>
          </div>

          <Separator className="my-3 bg-secondary-foreground" />

          <div className="flex-between">
            <div>
              <span className="text-secondary-foreground">
                Dừng hoạt động:{" "}
              </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.courseOverview.suspendedCourse}
              </span>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <p className="text-secondary-foreground">Đăng ký</p>
              <p className="text-xl font-semibold text-secondary-foreground">
                {overview.subscriptionOverview.activeSubscription}
              </p>
            </div>
            <div className="rounded-full bg-secondary-foreground p-3">
              <UserPlusIcon size={20} className="text-white" />
            </div>
          </div>

          <Separator className="my-3 bg-secondary-foreground" />

          <div className="flex-between">
            <div>
              <span className="text-secondary-foreground">Chờ duyệt: </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.subscriptionOverview.pendingSubscription}
              </span>
            </div>

            <div>
              <span className="text-secondary-foreground">Hết hạn: </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.subscriptionOverview.expiredSubscription}
              </span>
            </div>

            <div>
              <span className="text-secondary-foreground">Hủy: </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.subscriptionOverview.cancelledSubscription}
              </span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <p className="text-secondary-foreground">Doanh thu</p>
              <p className="text-xl font-semibold text-secondary-foreground">
                {overview.revenueOverview.totalRevenue}
              </p>
            </div>
            <div className="rounded-full bg-secondary-foreground p-3">
              <DollarSignIcon size={20} className="text-white" />
            </div>
          </div>

          <Separator className="my-3 bg-secondary-foreground" />

          <div className="flex-between">
            <div>
              <span className="text-secondary-foreground">Hoàn trả: </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.revenueOverview.refundAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Report */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <p className="text-secondary-foreground">Báo cáo</p>
              <p className="text-xl font-semibold text-secondary-foreground">
                {overview.reportOverview.pendingReport +
                  overview.reportOverview.resolvedReport}
              </p>
            </div>
            <div className="rounded-full bg-secondary-foreground p-3">
              <MessageSquareWarningIcon size={20} className="text-white" />
            </div>
          </div>

          <Separator className="my-3 bg-secondary-foreground" />

          <div className="flex-between">
            <div>
              <span className="text-secondary-foreground">Chờ duyệt: </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.reportOverview.pendingReport}
              </span>
            </div>

            <div>
              <span className="text-secondary-foreground">Đã xử lý: </span>
              <span className="font-semibold text-secondary-foreground">
                {overview.reportOverview.resolvedReport}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;
