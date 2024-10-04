import ReactDatePicker from "react-datepicker";

interface IProps {
  id: string;
  selected: Date;
  onChange: (date: Date | null) => void;
}

const DatetimeInput = ({ id, selected, onChange }: IProps) => {
  return (
    <ReactDatePicker
      id={id}
      selected={selected}
      onChange={onChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      className="mt-2 h-9 w-full rounded-md border border-primary px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    />
  );
};
export default DatetimeInput;
