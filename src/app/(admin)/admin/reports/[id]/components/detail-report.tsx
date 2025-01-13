import Image from "next/image";

import { TranslationsType } from "@/app/(admin)/admin/reports/[id]/components/report";
import Section from "@/app/(admin)/admin/reports/[id]/components/section";
import { DATE_TIME_FORMAT_OPTIONS, LOCALE } from "@/constants/date";
import {
  convertMilisecondsToLocaleDateString,
  convertMilisecondsToLocaleString,
  generateNameId,
} from "@/lib/utils";
import { DetailReportType } from "@/schemas/report.schema";

interface DetailReportProps {
  data: DetailReportType;
  tSubscriptionStatus: TranslationsType;
  tPaymentStatus: TranslationsType;
  tReport: TranslationsType;
}

const DetailReport = ({
  data,
  tPaymentStatus,
  tSubscriptionStatus,
  tReport,
}: DetailReportProps) => {
  if (data.subscription) {
    return (
      <div className="grid grid-cols-2 gap-5">
        <div className="grid grid-cols-1 gap-5">
          <Section title="Thông tin báo cáo">
            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Loại báo cáo: </span>
              <span className="text-secondary-foreground">
                {tReport(data.type.toLowerCase())}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Mô tả báo cáo: </span>
              <span className="text-secondary-foreground">
                {data.description}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Thời gian báo cáo: </span>
              <span className="text-secondary-foreground">
                {convertMilisecondsToLocaleString(data.createdAt)}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Trạng thái báo cáo: </span>
              <span className="text-secondary-foreground">
                {tReport(data.status.toLowerCase())}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Hướng giải quyết: </span>
              <span className="text-secondary-foreground">
                {data.resolution || "Chưa có"}
              </span>
            </div>
          </Section>

          <Section title="Thông tin đăng ký">
            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Trạng thái: </span>
              <span className="text-secondary-foreground">
                {tSubscriptionStatus(data.subscription.status.toLowerCase())}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Thời gian bắt đầu: </span>
              <span className="text-secondary-foreground">
                {convertMilisecondsToLocaleString(
                  data.subscription.courseAccessStartAt,
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
                  data.subscription.courseAccessEndAt,
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
              <span>Trạng thái thanh toán: </span>
              <span className="text-secondary-foreground">
                {tPaymentStatus(data.subscription.payment.status.toLowerCase())}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Số tiền thanh toán: </span>
              <span className="text-secondary-foreground">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.subscription.payment.price)}
              </span>
            </div>
          </Section>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* Course */}
          <Section title="Thông tin khóa học">
            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Tên khóa học: </span>
              <span className="text-secondary-foreground">
                {data.subscription.course.name}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              Mô tả khóa học:{" "}
              <span className="text-secondary-foreground">
                {data.subscription.course.description}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Giá khóa học: </span>
              <span className="text-secondary-foreground">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.subscription.orginalPrice)}
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
                  {data.subscription.student.name}
                </span>
                <div className="relative h-8 w-8">
                  <Image
                    src={
                      data.subscription.student.thumbnail?.originalUrl ||
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
                {data.subscription.student.email}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Số điện thoại học viên: </span>
              <span className="text-secondary-foreground">
                {data.subscription.student.phoneNumber}
              </span>
            </div>

            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Sinh nhật: </span>
              <span className="text-secondary-foreground">
                {convertMilisecondsToLocaleDateString(
                  data.subscription.student.dob
                )}
              </span>
            </div>
          </Section>

          {/* Mentor */}
          <Section
            title="Thông tin gia sư"
            link={`/admin/mentors/${generateNameId({
              name: data.subscription.mentor.name,
              id: data.subscription.mentor.id,
            })}`}
          >
            <div>
              <div className="mb-[2px] mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Tên gia sư: </span>
              <div className="inline-flex items-center gap-2">
                <span className="text-secondary-foreground">
                  {data.subscription.mentor.name}
                </span>
                <div className="relative h-8 w-8">
                  <Image
                    src={
                      data.subscription.mentor.thumbnail?.originalUrl ||
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
  }
};
export default DetailReport;
