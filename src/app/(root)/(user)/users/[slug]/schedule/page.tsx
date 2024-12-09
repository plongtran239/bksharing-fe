import { DAY_OF_WEEK } from "@/constants/enum";
import { ScheduleType } from "@/schemas/schedule.schema";

const MentorSchedulePage = () => {
  const schedules: ScheduleType[] = [];

  // 6:00 - 23:00
  const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6);

  // Chuyển đổi dữ liệu thành cấu trúc phù hợp với bảng
  const formattedSchedules = Object.values(DAY_OF_WEEK).map((day) => {
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
    <div className="container py-10">
      <table className="w-full table-fixed border-collapse border border-gray-200">
        <thead>
          <tr className="h-8 text-secondary-foreground">
            <th className="border border-gray-300"></th>
            {Object.values(DAY_OF_WEEK).map((day) => (
              <th
                key={day}
                scope="col"
                className="border border-gray-300 capitalize"
              >
                {day.toLowerCase()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-center text-sm">
          {timeSlots.map((hour) => {
            return (
              <tr key={hour} className="h-8">
                <td className="border border-gray-300">{`${hour}:00`}</td>

                {formattedSchedules.map(({ day, schedule }) => {
                  const ranges = schedule[hour - 6];

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

                      // return (
                      //   <AvailableRow
                      //     key={day}
                      //     span={span}
                      //     scheduleId={ranges[0].id}
                      //   >
                      //     {`${ranges[0].startTime} - ${ranges[0].endTime}`}
                      //   </AvailableRow>
                      // );
                    }
                  }

                  if (!isMerged.has(`${day}-${hour}`)) {
                    return (
                      <td key={day} className="border border-gray-300"></td>
                    );
                  }

                  return null; // Tránh tạo ô trùng lặp
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default MentorSchedulePage;
