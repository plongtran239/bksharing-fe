import { OVERVIEW_TYPE } from "@/app/(admin)/admin/dashboard/components/overview";

interface IProps {
  icon: React.ReactNode;
  data: number | string;
  type: OVERVIEW_TYPE;
}

const OverviewCard = ({ icon, data, type }: IProps) => {
  const renderType = () => {
    switch (type) {
      case OVERVIEW_TYPE.MENTORS:
        return "Mentors";
      case OVERVIEW_TYPE.STUDENTS:
        return "Students";
      case OVERVIEW_TYPE.COURSES:
        return "Courses";
      case OVERVIEW_TYPE.SUBSCRIPTIONS:
        return "Subscriptions";
      case OVERVIEW_TYPE.REVENUE:
        return "Revenue";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex w-full items-center gap-5 rounded-xl bg-secondary p-3">
      {/* Mentors */}
      <div className="rounded-full bg-secondary-foreground p-4">{icon}</div>
      <div className="space-x-2">
        <span className="text-lg font-bold text-secondary-foreground">
          {data}
        </span>
        <span className="text-secondary-foreground">{renderType()}</span>
      </div>
    </div>
  );
};
export default OverviewCard;
