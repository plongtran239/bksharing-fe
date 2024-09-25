"use client";

import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MIN_DATE } from "@/constants/date";

interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  id: string;
}

const DateInput = ({ value, onChange, id }: DateInputProps) => {
  const [month, setMonth] = useState<Date>(new Date());

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const [inputValue, setInputValue] = useState("");

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, "dd/MM/yyyy"));
    }

    return onChange(date as Date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync

    const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }

    return onChange(parsedDate);
  };

  return (
    <div className="flex-between relative">
      <Input
        placeholder="dd/MM/yyyy"
        onChange={handleInputChange}
        value={inputValue}
        id={id}
      />

      <Popover>
        <PopoverTrigger className="absolute right-3 text-muted-foreground hover:text-primary">
          <CalendarIcon size={16} />
        </PopoverTrigger>
        <PopoverContent align="end">
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            disabled={(date) => date > new Date() || date < new Date(MIN_DATE)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DateInput;
