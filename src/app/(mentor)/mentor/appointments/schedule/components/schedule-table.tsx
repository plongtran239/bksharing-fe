import ScheduleRow from "@/app/(mentor)/mentor/appointments/schedule/components/schedule-row";
import { DAY_OF_WEEK } from "@/constants/enum";

const ScheduleTable = () => {
  return (
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

      <tbody className="text-sm">
        {Array.from({ length: 18 }, (_, i) => (
          <ScheduleRow key={i} heading={i + 6} />
        ))}
      </tbody>
    </table>
  );
};
export default ScheduleTable;
