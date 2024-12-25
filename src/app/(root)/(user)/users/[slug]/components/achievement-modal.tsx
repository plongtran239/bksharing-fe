import { vi } from "date-fns/locale";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { AchivementRequestType } from "@/schemas";

interface IModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  type: ACHIEVEMENT_TYPES | "ABOUT";
  handleCancel: () => void;
  handleSave: () => void;
  form?: UseFormReturn<AchivementRequestType>;
  bio?: string;
  setBio?: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

const AchievementModal = ({
  isOpen,
  title,
  description,
  type,
  handleCancel,
  handleSave,
  form,
  isLoading,
  bio,
  setBio,
}: IModalProps) => {
  const achievementField = {
    [ACHIEVEMENT_TYPES.EDUCATION]: "major",
    [ACHIEVEMENT_TYPES.EXPERIENCE]: "position",
    [ACHIEVEMENT_TYPES.CERTIFICATION]: "name",
  }[type as ACHIEVEMENT_TYPES] as "major" | "position" | "name";

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} modal>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1 text-primary">
            {title}
          </DialogTitle>

          <DialogDescription>{description}</DialogDescription>

          {type === "ABOUT" && setBio && (
            <div>
              <Textarea
                rows={5}
                className="mb-5 mt-3 text-black"
                placeholder="Enter your about..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          )}

          {type !== "ABOUT" && form && (
            <Form {...form}>
              <form
                className="space-y-5 pb-5"
                onSubmit={form.handleSubmit(handleSave)}
              >
                <FormField
                  control={form.control}
                  name={achievementField}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="achievementField" required>
                        {achievementField}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="achievementField"
                          placeholder={`enter ${achievementField}...`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="organization" required>
                        Organization
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="organization"
                          placeholder="enter organization..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isCurrent"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel htmlFor="isCurrent" className="mt-1">
                        Current
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          id="isCurrent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="start" required>
                        Start Date
                      </FormLabel>
                      <FormControl>
                        <DateTimePicker
                          id="start"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="date of birth"
                          displayFormat={{ hour24: "dd/MM/yyyy" }}
                          granularity="day"
                          limitToCurrent={true}
                          locale={vi}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!form.watch("isCurrent") && (
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="end">End Date</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            id="end"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="end date"
                            displayFormat={{ hour24: "dd/MM/yyyy" }}
                            granularity="day"
                            locale={vi}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="enter description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              disabled={
                isLoading ||
                (type !== "ABOUT" &&
                  form &&
                  (form.formState.isSubmitting || !form.formState.isDirty))
              }
              onClick={
                type !== "ABOUT" && form
                  ? form.handleSubmit(handleSave)
                  : handleSave
              }
            >
              {isLoading ? <Loader /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AchievementModal;
