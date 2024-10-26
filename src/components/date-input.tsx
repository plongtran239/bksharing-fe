"use client";

import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { forwardRef, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MIN_DATE } from "@/constants/date";

interface DateInputProps {
  value: Date | undefined;
  defaultValue?: string;
  onChange: (date: Date | undefined) => void;
  id: string;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, defaultValue, onChange, id }, ref) => {
    const [month, setMonth] = useState<Date>(new Date());

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

    const [inputValue, setInputValue] = useState(defaultValue);

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
      }

      if (e.target.value === "") {
        setSelectedDate(undefined);
        return onChange(undefined);
      }

      return onChange(parsedDate);
    };

    return (
      <div className="flex-between relative w-full">
        <Input
          placeholder="dd/MM/yyyy"
          onChange={handleInputChange}
          value={inputValue}
          id={id}
          ref={ref}
        />

        <Popover modal>
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
              disabled={(date) =>
                date > new Date() || date < new Date(MIN_DATE)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
DateInput.displayName = "DateInput";

export default DateInput;
