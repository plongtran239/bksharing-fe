"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  // const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-5">
      {/* Date Of Week */}
      <div className="space-y-2">
        <p className="text-lg font-semibold capitalize text-black">
          Day Of Week
        </p>
        <Select>
          <SelectTrigger className="w-[200px] capitalize">
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
        <div className="w-fit"></div>
      </div>

      {/* End Time */}
      <div className="space-y-2">
        <p className="text-lg font-semibold capitalize text-black">End Time</p>
        <div className="w-fit"></div>
      </div>

      {/* Buttons */}
      <Separator />

      <Button>Add</Button>
    </div>
  );
};

export default Scheduling;
