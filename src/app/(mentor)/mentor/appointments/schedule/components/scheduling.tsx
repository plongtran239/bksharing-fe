"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/datetime-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DAY_OF_WEEK } from "@/constants/enum";

const Scheduling = () => {
  const [time, setTime] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-5">
      {/* Date Of Week */}
      <div className="space-y-2">
        <p className="text-lg font-semibold capitalize text-black">
          Day Of Week
        </p>
        <Select>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select day of week" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            {Object.values(DAY_OF_WEEK).map((day) => (
              <SelectItem key={day} value={day}>
                {day.toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Start Time */}
      <div className="space-y-2">
        <p className="text-lg font-semibold capitalize text-black">
          Start Time
        </p>
        <TimePicker
          granularity="minute"
          date={time}
          onChange={setTime}
          hourCycle={12}
        />
      </div>

      {/* End Time */}
      <div className="space-y-2">
        <p className="text-lg font-semibold capitalize text-black">Duration</p>
        <Select>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="90">1.5 hours</SelectItem>
            <SelectItem value="120">2 hours</SelectItem>
            <SelectItem value="150">2.5 hours</SelectItem>
            <SelectItem value="180">3 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <Separator />

      <Button>Add</Button>
    </div>
  );
};

export default Scheduling;
