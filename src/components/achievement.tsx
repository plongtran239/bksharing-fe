interface IProps {
  field: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Achievement = ({
  field,
  organization,
  description,
  startDate,
  endDate,
}: IProps) => {
  return (
    <div className="flex justify-between">
      <div className="w-4/5">
        {/* name / position / major */}
        <p className="text-lg font-semibold text-secondary-foreground">
          {field}
        </p>

        {/* organization */}
        <p className="text-black">{organization}</p>

        {/* description */}
        <p className="text-sm text-foreground/70">{description}</p>
      </div>

      {/* start date - end date */}
      <p className="">
        {startDate} - {endDate}
      </p>
    </div>
  );
};
export default Achievement;
