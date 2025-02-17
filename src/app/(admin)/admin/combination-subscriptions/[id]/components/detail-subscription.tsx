import { Formats, TranslationValues } from "next-intl";

import subscriptionApi from "@/apis/subscription.api";
import StudentCard from "@/app/(admin)/admin/combination-subscriptions/[id]/components/student-card";
import Section from "@/app/(mentor)/mentor/requests/[id]/components/section";
import { DATE_TIME_FORMAT_OPTIONS, LOCALE } from "@/constants/date";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { convertMilisecondsToLocaleString } from "@/lib/utils";

const DetailSubscription = async ({
  subscriptionId,
  tSubscriptionStatus,
}: {
  subscriptionId: number;
  tSubscriptionStatus: {
    <TargetKey>(
      key: TargetKey,
      values?: TranslationValues,
      formats?: Formats
    ): string;
  };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await subscriptionApi.getAdminDetailCombinationSubscriptions(
    sessionToken,
    subscriptionId
  );

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Subscription */}
      <div className="space-y-5">
        <Section title="Thông tin đăng ký">
          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Trạng thái: </span>
            <span className="text-secondary-foreground">
              {tSubscriptionStatus(data.status.toLowerCase())}
            </span>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Số lượng đăng ký: </span>
            <span className="text-secondary-foreground">{data.ids.length}</span>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Thời gian bắt đầu: </span>
            <span className="text-secondary-foreground">
              {convertMilisecondsToLocaleString(
                data.courseAccessStartAt,
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
                data.courseAccessEndAt,
                LOCALE,
                {
                  ...DATE_TIME_FORMAT_OPTIONS,
                  timeZone: "UTC",
                }
              )}
            </span>
          </div>
        </Section>

        <Section title="Thông tin khóa học">
          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Tên khóa học: </span>
            <span className="text-secondary-foreground">
              {data.course.name}
            </span>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            Mô tả khóa học:{" "}
            <span className="text-secondary-foreground">
              {data.course.description}
            </span>
          </div>

          <div>
            <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Giá khóa học: </span>
            <span className="text-secondary-foreground">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.orginalPrice)}
            </span>
          </div>
        </Section>
      </div>

      <div>
        <div className="h-[640px] space-y-5 overflow-y-scroll">
          {data.combinedStudents.map((student) => (
            <StudentCard key={student.info.id} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default DetailSubscription;
