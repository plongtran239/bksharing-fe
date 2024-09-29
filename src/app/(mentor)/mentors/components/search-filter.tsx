"use client";

import DateInput from "@/components/date-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilter = () => {
  return (
    <div className="flex-between gap-5 rounded-xl border border-primary bg-white p-5 shadow-xl">
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input placeholder="Mentor" />

      <Input placeholder="Major" />

      <Dialog>
        <DialogTrigger asChild>
          <div className="flex-between h-9 w-full min-w-[220px] cursor-pointer rounded-lg border border-primary px-3 py-1 text-sm font-light">
            <span>Free schedule</span>
            {/* <span>22/09/2023 - 20/23/2032</span> */}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select a free schedule</DialogTitle>
            <DialogDescription>
              Select a free schedule to filter mentors
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="from" className="text-right">
                From
              </Label>
              <div className="col-span-3">
                <DateInput id="from" value={new Date()} onChange={() => {}} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="to" className="text-right">
                To
              </Label>
              <div className="col-span-3">
                <DateInput id="to" value={new Date()} onChange={() => {}} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button>Apply</Button>
    </div>
  );
};
export default SearchFilter;
