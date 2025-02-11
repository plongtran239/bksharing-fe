"use client";

import { useTranslations } from "next-intl";

import AvailableRow from "@/components/available-row";
import { DAY_OF_WEEK } from "@/constants/enum";
import { cn, convertMilisecondsToLocaleString } from "@/lib/utils";
import { ScheduleType } from "@/schemas/schedule.schema";
import { MentorSubscriptionType } from "@/schemas/subscription.schema";

const ScheduleTable = ({
  schedules,
  weekStartDate = new Date(),
  showDate = false,
  showToday = false,
  showCourseName = false,
  activeSchedule,
  setActiveSchedule,
  setActiveScheduleId,
  handleOpenDialog,
  mentorSubscriptions,
}: {
  schedules: ScheduleType[];
  weekStartDate?: Date;
  showDate?: boolean;
  showToday?: boolean;
  showCourseName?: boolean;
  activeSchedule?: { scheduleId: number; date: string };
  setActiveSchedule?: (
    schedule: { scheduleId: number; date: string } | undefined
  ) => void;
  setActiveScheduleId?: (id: number | undefined) => void;
  handleOpenDialog?: () => void;
  mentorSubscriptions?: MentorSubscriptionType[];
}) => {
  const t = useTranslations("dateOfWeek");

  // 6:00 - 23:00
  const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Tính toán ngày cho mỗi thứ
  const daysWithDates = Object.values(DAY_OF_WEEK).map((day, index) => {
    const currentDate = new Date(weekStartDate);

    currentDate.setDate(weekStartDate.getDate() + index); // Cộng số ngày để lấy đúng thứ

    return {
      day,
      date: currentDate.toLocaleDateString("vi-VN", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }), // Định dạng ngày/tháng
      isToday:
        currentDate.toLocaleDateString() === today.toLocaleDateString() &&
        showToday,
    };
  });

  // Chuyển đổi dữ liệu thành cấu trúc phù hợp với bảng
  const formattedSchedules = Object.values(DAY_OF_WEEK).map((day, index) => {
    const currentDate = new Date(weekStartDate);
    currentDate.setDate(weekStartDate.getDate() + index);

    // Nếu ngày này trước hôm nay, trả về lịch trống
    const notShowCondition =
      currentDate < today ||
      currentDate.toLocaleDateString() === today.toLocaleDateString();

    if (notShowCondition && showToday) {
      return { day, schedule: timeSlots.map(() => []) };
    }

    const daySchedule = timeSlots.map((hour) => {
      const dayData = schedules.find((schedule) => schedule.dayOfWeek === day);

      const matchingRanges = dayData?.timeRanges.filter((range) => {
        if (parseInt(range.endTime.split(":")[1]) > 0) {
          return (
            parseInt(range.startTime.split(":")[0]) <= hour &&
            parseInt(range.endTime.split(":")[0]) >= hour
          );
        }

        return (
          parseInt(range.startTime.split(":")[0]) <= hour &&
          parseInt(range.endTime.split(":")[0]) > hour
        );
      });

      return matchingRanges;
    });

    return { day, schedule: daySchedule };
  });

  // Tính số hàng cần merge
  const getRowSpan = (
    hour: number,
    daySchedule: { id: number; startTime: string; endTime: string }[][]
  ) => {
    const ranges = daySchedule[hour - 6];

    if (ranges && ranges.length > 0) {
      let span = 1;

      const [hourEnd, minuteEnd] = ranges[0].endTime.split(":");

      const rangeEndTime =
        parseInt(hourEnd) + (parseInt(minuteEnd) > 0 ? 1 : 0);

      for (let i = hour + 1; i < rangeEndTime; i++) {
        if (daySchedule[i - 6].length > 0) {
          span++;
        }
      }

      return span;
    }

    return 1;
  };

  // Set lưu trữ những dòng đã được merge
  const isMerged = new Set();

  return (
    <table className="w-full table-fixed border-collapse border border-gray-200">
      <thead>
        <tr className="h-8 text-secondary-foreground">
          <th className="border border-gray-300"></th>
          {showDate
            ? daysWithDates.map(({ day, date }) => (
                <th
                  key={day}
                  scope="col"
                  className="border border-gray-300 capitalize"
                >
                  <div>{t(day.toLowerCase())}</div>
                  <div className="text-xs text-gray-500">
                    {date.slice(0, 5)}
                  </div>
                </th>
              ))
            : Object.values(DAY_OF_WEEK).map((day) => (
                <th
                  key={day}
                  scope="col"
                  className="border border-gray-300 capitalize"
                >
                  {t(day.toLowerCase())}
                </th>
              ))}
        </tr>
      </thead>

      <tbody className="text-center text-sm">
        {timeSlots.map((hour) => {
          return (
            <tr key={hour} className="h-8">
              <td className="border border-gray-300">{`${hour}:00`}</td>

              {formattedSchedules.map(({ day, schedule }, index) => {
                const ranges = schedule[hour - 6];
                const isToday = daysWithDates[index].isToday;

                if (ranges && ranges.length > 0) {
                  const span = getRowSpan(
                    hour,
                    schedule as {
                      id: number;
                      startTime: string;
                      endTime: string;
                    }[][]
                  );

                  // Duyệt các giờ đã merge và không tạo ô trùng
                  if (!isMerged.has(`${day}-${hour}`)) {
                    // Đánh dấu ô này đã merge
                    for (let i = hour; i < hour + span; i++) {
                      isMerged.add(`${day}-${i}`);
                    }

                    return (
                      <AvailableRow
                        key={day}
                        span={span}
                        scheduleId={ranges[0].id}
                        date={daysWithDates[index].date}
                        isActive={
                          activeSchedule?.scheduleId === ranges[0].id &&
                          activeSchedule?.date === daysWithDates[index].date
                        }
                        handleClick={() => {
                          if (handleOpenDialog) {
                            setActiveScheduleId &&
                              setActiveScheduleId(ranges[0].id);
                            handleOpenDialog();
                            return;
                          }

                          if (
                            activeSchedule?.scheduleId === ranges[0].id &&
                            activeSchedule?.date === daysWithDates[index].date
                          ) {
                            setActiveSchedule && setActiveSchedule(undefined);
                          } else {
                            setActiveSchedule &&
                              setActiveSchedule({
                                scheduleId: ranges[0].id,
                                date: daysWithDates[index].date,
                              });
                          }
                        }}
                        isBooked={mentorSubscriptions?.some((sub) => {
                          const start = convertMilisecondsToLocaleString(
                            sub.courseAccessStartAt,
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              timeZone: "UTC",
                            }
                          );

                          const end = convertMilisecondsToLocaleString(
                            sub.courseAccessEndAt,
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              timeZone: "UTC",
                            }
                          );

                          const [timeStart, dateStart] = start.split(" ");
                          const [timeEnd, dateEnd] = end.split(" ");

                          return (
                            dateStart === daysWithDates[index].date &&
                            dateEnd === daysWithDates[index].date &&
                            timeStart === ranges[0].startTime &&
                            timeEnd === ranges[0].endTime
                          );
                        })}
                      >
                        {showCourseName && (
                          <p className="text-xs font-semibold">{`${ranges[0].course.name}`}</p>
                        )}
                        <p className="text-sm">
                          ({`${ranges[0].startTime} - ${ranges[0].endTime}`})
                        </p>
                      </AvailableRow>
                    );
                  }
                }

                if (!isMerged.has(`${day}-${hour}`)) {
                  return (
                    <td
                      key={day}
                      className={cn("border border-gray-300", {
                        "bg-yellow-100": isToday,
                      })}
                    ></td>
                  );
                }

                return null; // Tránh tạo ô trùng lặp
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ScheduleTable;
