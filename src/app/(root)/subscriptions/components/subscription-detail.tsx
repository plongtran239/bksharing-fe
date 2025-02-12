"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import subscriptionApi from "@/apis/subscription.api";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { convertMilisecondsToLocaleString } from "@/lib/utils";
import { SubscriptionDetailType } from "@/schemas/subscription.schema";

interface IProps {
  activeItemId: number | undefined;
}

const SubscriptionDetail = ({ activeItemId }: IProps) => {
  const t = useTranslations("report");

  const [loading, setLoading] = useState(false);

  const [subscriptionDetail, setSubscriptionDetail] =
    useState<SubscriptionDetailType>();

  useEffect(() => {
    async function fetchSubscriptionDetail() {
      setLoading(true);

      if (!activeItemId) {
        return;
      }

      const { payload } =
        await subscriptionApi.getDetailSubscription(activeItemId);

      setSubscriptionDetail(payload);
      setLoading(false);
    }

    if (activeItemId) {
      fetchSubscriptionDetail();
    }
  }, [activeItemId]);

  if (loading) {
    return <Loader />;
  }

  if (!activeItemId || !subscriptionDetail) {
    return (
      <div className="flex-center h-full flex-col">
        <p>Bạn chưa có đăng ký khóa học nào. Hãy đăng ký ngay!</p>
        <Link className="mt-5" href="/courses">
          <Button>Đăng ký ngay</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5 text-lg">
      <div className="flex items-center gap-5">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <p>
          Học với gia sư{" "}
          <span className="text-primary">{subscriptionDetail.mentor.name}</span>
        </p>
        <div className="relative h-10 w-10">
          <Image
            src={
              subscriptionDetail.mentor.thumbnail?.originalUrl ||
              "/images/default-user.png"
            }
            alt={subscriptionDetail.mentor.name}
            fill
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <p>
          Thời gian: {""}
          <span className="text-primary">
            {convertMilisecondsToLocaleString(
              subscriptionDetail.courseAccessStartAt,
              "vi-VN",
              {
                hour: "numeric",
                minute: "numeric",
                timeZone: "UTC",
              }
            )}
          </span>
          {" - "}
          <span className="text-primary">
            {convertMilisecondsToLocaleString(
              subscriptionDetail.courseAccessEndAt,
              "vi-VN",
              {
                hour: "numeric",
                minute: "numeric",
                day: "numeric",
                month: "numeric",
                year: "numeric",
                timeZone: "UTC",
              }
            )}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <p>
          Thời lượng: {""}
          <span className="text-primary">
            {Math.round(
              Number(subscriptionDetail.courseAccessEndAt) -
                Number(subscriptionDetail.courseAccessStartAt)
            ) / 3600000}{" "}
            giờ
          </span>
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <p>
          Khóa học: {""}
          <span className="text-primary">{subscriptionDetail.course.name}</span>
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <p>
          Giá tiền: {""}
          <span className="text-primary">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(Number(subscriptionDetail.orginalPrice))}
          </span>
        </p>
      </div>

      {subscriptionDetail.report && (
        <>
          <div className="flex items-center gap-5">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <p>
              Tình trạng báo cáo: {""}
              <span className="text-red-400">
                {t(subscriptionDetail.report.status.toLowerCase())}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <p className="w-[500px]">
              Hướng giải quyết: {""}
              <span className="capitalize text-red-400">
                {subscriptionDetail.report.resolution || "Chưa có"}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};
export default SubscriptionDetail;
