"use client";

import {
  BookCopyIcon,
  DollarSignIcon,
  GraduationCapIcon,
  MessageSquareWarningIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import dashboardApi from "@/apis/dashboard.api";
import { Separator } from "@/components/ui/separator";
import {
  COURSE_STATUS,
  MENTOR_STATUS,
  REPORT_STATUS,
  SUBSCRIPTION_STATUS,
} from "@/constants/enum";
import { DashboardOverviewType } from "@/schemas/dashboard.schema";

export enum OVERVIEW_TYPE {
  MENTORS = "MENTORS",
  STUDENTS = "STUDENTS",
  COURSES = "COURSES",
  SUBSCRIPTIONS = "SUBSCRIPTIONS",
  REVENUE = "REVENUE",
}

const Overview = () => {
  const router = useRouter();

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
              <button
                className="block text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(`/admin/mentors?status=${MENTOR_STATUS.ACCEPTED}`)
                }
              >
                Gia sư
              </button>
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
              <button
                className="text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(`/admin/mentors?status=${MENTOR_STATUS.PENDING}`)
                }
              >
                <span>Chờ duyệt:</span>
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {overview.mentorOverview.pendingMentor}
              </span>
            </div>
          </div>
        </div>

        {/* Course */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <button
                className="block text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(`/admin/courses?status=${COURSE_STATUS.APPROVED}`)
                }
              >
                Khóa học
              </button>
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
              <button
                className="text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(`/admin/courses?status=${COURSE_STATUS.PENDING}`)
                }
              >
                Chờ duyệt:
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {overview.courseOverview.pendingCourse}
              </span>
            </div>
            <div>
              <button
                className="text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(`/admin/courses?status=${COURSE_STATUS.REJECTED}`)
                }
              >
                Dừng hoạt động:{" "}
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {overview.courseOverview.suspendedCourse}
              </span>
            </div>
          </div>
        </div>

        {/* Student */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <button className="block text-secondary-foreground hover:underline">
                Học viên
              </button>
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
              <button className="text-secondary-foreground hover:underline">
                Dừng hoạt động:
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {overview.courseOverview.suspendedCourse}
              </span>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <button
                className="block text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(
                    `/admin/subscriptions?status=${SUBSCRIPTION_STATUS.ACTIVE}`
                  )
                }
              >
                Đăng ký
              </button>
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
              <button
                className="text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(
                    `/admin/subscriptions?status=${SUBSCRIPTION_STATUS.PENDING}`
                  )
                }
              >
                Chờ duyệt:
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {overview.subscriptionOverview.pendingSubscription}
              </span>
            </div>

            <div>
              <button
                className="text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(
                    `/admin/subscriptions?status=${SUBSCRIPTION_STATUS.EXPIRED}`
                  )
                }
              >
                Hết hạn:
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {overview.subscriptionOverview.expiredSubscription}
              </span>
            </div>

            <div>
              <button
                className="text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(
                    `/admin/subscriptions?status=${SUBSCRIPTION_STATUS.CANCELED}`
                  )
                }
              >
                Hủy:
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {overview.subscriptionOverview.cancelledSubscription}
              </span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <button className="block text-secondary-foreground hover:underline">
                Doanh thu
              </button>
              <p className="text-xl font-semibold text-secondary-foreground">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(overview.revenueOverview.totalRevenue)}
              </p>
            </div>
            <div className="rounded-full bg-secondary-foreground p-3">
              <DollarSignIcon size={20} className="text-white" />
            </div>
          </div>

          <Separator className="my-3 bg-secondary-foreground" />

          <div className="flex-between">
            <div>
              <button className="text-secondary-foreground hover:underline">
                Hoàn trả:
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(overview.revenueOverview.refundAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Report */}
        <div className="rounded-xl border border-primary bg-secondary p-5 shadow">
          <div className="flex-between">
            <div>
              <button
                className="block text-secondary-foreground hover:underline"
                onClick={() => router.push("/admin/reports")}
              >
                Báo cáo
              </button>
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
              <button
                className="text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(`/admin/reports?status=${REPORT_STATUS.PENDING}`)
                }
              >
                Chờ duyệt:
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
                {overview.reportOverview.pendingReport}
              </span>
            </div>

            <div>
              <button
                className="text-secondary-foreground hover:underline"
                onClick={() =>
                  router.push(`/admin/reports?status=${REPORT_STATUS.RESOLVED}`)
                }
              >
                Đã xử lý:
              </button>
              <span className="font-semibold text-secondary-foreground">
                {" "}
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
