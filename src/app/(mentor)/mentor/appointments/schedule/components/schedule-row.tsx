import { DAY_OF_WEEK } from "@/constants/enum";

interface IProps {
  heading: number;
}

const ScheduleRow = ({ heading }: IProps) => {
  return (
    <tr className="h-8">
      <th scope="row" className="border border-gray-300">
        {heading}:00
      </th>
      {Object.values(DAY_OF_WEEK).map((_, index) => (
        <td key={`${heading}-${index}`} className="border border-gray-300">
          {/* Nội dung hoặc để trống */}
        </td>
      ))}
    </tr>
  );
};
export default ScheduleRow;
