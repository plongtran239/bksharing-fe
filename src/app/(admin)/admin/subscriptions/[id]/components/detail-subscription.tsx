import { Formats, TranslationValues } from "next-intl";
import Image from "next/image";

import subscriptionApi from "@/apis/subscription.api";
import Section from "@/app/(admin)/admin/subscriptions/[id]/components/section";
import ActionButtons from "@/app/(mentor)/mentor/requests/[id]/components/action-buttons";
import { Separator } from "@/components/ui/separator";
import { DATE_TIME_FORMAT_OPTIONS, LOCALE } from "@/constants/date";
import { SUBSCRIPTION_STATUS } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import {
  convertMilisecondsToLocaleDateString,
  convertMilisecondsToLocaleString,
} from "@/lib/utils";

const DetailSubscription = async ({
  subscriptionId,
  tSubscriptionStatus,
  tPaymentStatus,
}: {
  subscriptionId: number;
  tSubscriptionStatus: {
    <TargetKey>(
      key: TargetKey,
      values?: TranslationValues,
      formats?: Formats
    ): string;
  };
  tPaymentStatus: {
    <TargetKey>(
      key: TargetKey,
      values?: TranslationValues,
      formats?: Formats
    ): string;
  };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const { payload } = await subscriptionApi.getAdminSubscriptionDetail(
    sessionToken,
    subscriptionId
  );

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Subscription */}
      <Section title="Thông tin đăng ký">
        <div>
          <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
          <span>Trạng thái: </span>
          <span className="text-secondary-foreground">
            {tSubscriptionStatus(payload.status.toLowerCase())}
          </span>
        </div>

        <div>
          <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
          <span>Thời gian bắt đầu: </span>
          <span className="text-secondary-foreground">
            {convertMilisecondsToLocaleString(
              payload.courseAccessStartAt,
              LOCALE,
              {
                ...DATE_TIME_FORMAT_OPTIONS,
                timeZone: "UTC",
              }
            )}
          </span>
        </div>

        <div>
          <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
          <span>Thời gian kết thúc: </span>
          <span className="text-secondary-foreground">
            {convertMilisecondsToLocaleString(
              payload.courseAccessEndAt,
              LOCALE,
              {
                ...DATE_TIME_FORMAT_OPTIONS,
                timeZone: "UTC",
              }
            )}
          </span>
        </div>

        {payload.payment ? (
          <>
            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Trạng thái thanh toán: </span>
              <span className="text-secondary-foreground">
                {tPaymentStatus(payload.payment.status.toLowerCase())}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Số tiền thanh toán: </span>
              <span className="text-secondary-foreground">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(payload.payment.price)}
              </span>
            </div>
          </>
        ) : (
          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Trạng thái thanh toán: </span>
            <span className="text-secondary-foreground">
              {tPaymentStatus("pending")}
            </span>
          </div>
        )}

        {payload.status === SUBSCRIPTION_STATUS.PENDING && (
          <>
            <Separator className="my-5 bg-primary" />

            <ActionButtons subscription={payload} />
          </>
        )}
      </Section>

      <div className="grid grid-cols-1 gap-5">
        {/* Course */}
        <Section
          title="Thông tin khóa học"
          link={`/admin/courses/${payload.course.id}`}
        >
          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Tên khóa học: </span>
            <span className="text-secondary-foreground">
              {payload.course.name}
            </span>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            Mô tả khóa học:{" "}
            <span className="text-secondary-foreground">
              {payload.course.description}
            </span>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Giá khóa học: </span>
            <span className="text-secondary-foreground">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(payload.orginalPrice)}
            </span>
          </div>
        </Section>

        {/* Student */}
        <Section title="Thông tin học viên">
          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Tên học viên: </span>
            <div className="inline-flex items-center gap-2">
              <span className="text-secondary-foreground">
                {payload.student.name}
              </span>
              <div className="relative h-8 w-8">
                <Image
                  src={
                    payload.student.thumbnail?.originalUrl ||
                    "/images/default-user.png"
                  }
                  alt=""
                  fill
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Email học viên: </span>
            <span className="text-secondary-foreground">
              {payload.student.email}
            </span>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Số điện thoại học viên: </span>
            <span className="text-secondary-foreground">
              {payload.student.phoneNumber}
            </span>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Sinh nhật: </span>
            <span className="text-secondary-foreground">
              {convertMilisecondsToLocaleDateString(payload.student.dob)}
            </span>
          </div>
        </Section>

        {/* Mentor */}
        <Section
          title="Thông tin gia sư"
          link={`/admin/mentors/${payload.mentor.id}`}
        >
          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Tên gia sư: </span>
            <div className="inline-flex items-center gap-2">
              <span className="text-secondary-foreground">
                {payload.mentor.name}
              </span>
              <div className="relative h-8 w-8">
                <Image
                  src={
                    payload.mentor.thumbnail?.originalUrl ||
                    "/images/default-user.png"
                  }
                  alt=""
                  fill
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};
export default DetailSubscription;
