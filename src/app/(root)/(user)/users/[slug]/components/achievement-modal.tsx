import { vi } from "date-fns/locale";
import { useTranslations } from "next-intl";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CERTIFICATIONS from "@/constants/certification";
import COMPANIES from "@/constants/company";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import MAJORS from "@/constants/major";
import ORGANIZATIONS from "@/constants/organization";
import POSITIONS from "@/constants/position";
import SCHOOLS from "@/constants/school";
import { cn } from "@/lib/utils";
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

  const organizationField = {
    [ACHIEVEMENT_TYPES.EDUCATION]: "school",
    [ACHIEVEMENT_TYPES.EXPERIENCE]: "company",
    [ACHIEVEMENT_TYPES.CERTIFICATION]: "organization",
  }[type as ACHIEVEMENT_TYPES] as "school" | "company" | "organization";

  const t = useTranslations("authPage.register.mentorForm.achievementForm");

  const renderField = (type: ACHIEVEMENT_TYPES) => {
    switch (type) {
      case ACHIEVEMENT_TYPES.EDUCATION:
        return MAJORS;
      case ACHIEVEMENT_TYPES.EXPERIENCE:
        return POSITIONS;
      case ACHIEVEMENT_TYPES.CERTIFICATION:
        return CERTIFICATIONS;
    }
  };

  const renderOrganizationField = (type: ACHIEVEMENT_TYPES) => {
    switch (type) {
      case ACHIEVEMENT_TYPES.EDUCATION:
        return SCHOOLS;
      case ACHIEVEMENT_TYPES.EXPERIENCE:
        return COMPANIES;
      case ACHIEVEMENT_TYPES.CERTIFICATION:
        return ORGANIZATIONS;
    }
  };

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
                placeholder="Nhập thông tin ..."
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
                      <FormLabel
                        htmlFor="achievementField"
                        required
                        className=""
                      >
                        {t(achievementField)}
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn("text-sm", {
                              "text-muted-foreground": !field.value,
                            })}
                          >
                            <SelectValue placeholder="chọn..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {renderField(type).map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        {t(organizationField)}
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn("text-sm", {
                              "text-muted-foreground": !field.value,
                            })}
                          >
                            <SelectValue placeholder="chọn ..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {renderOrganizationField(type).map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        Hiện tại
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
                        Ngày bắt đầu
                      </FormLabel>
                      <FormControl>
                        <DateTimePicker
                          id="start"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="ngày bắt đầu"
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
                        <FormLabel htmlFor="end">Ngày kết thúc</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            id="end"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="ngày kết thúc"
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
                      <FormLabel htmlFor="description">Mô tả</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="nhập..."
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
