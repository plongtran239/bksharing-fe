import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { PlusIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { childVariants } from "@/constants/motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { MentorRegisterRequestType } from "@/schemas";

interface IProps {
  form: UseFormReturn<MentorRegisterRequestType>;
}

const AchievementForm = ({ form }: IProps) => {
  const t = useTranslations("authPage.register.mentorForm.achievementForm");

  const { toast } = useToast();

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  const handleAddAchievement = () => {
    append({
      achievementType: ACHIEVEMENT_TYPES.EXPERIENCE,
      description: "",
      organization: "",
      startDate: new Date(),
      endDate: undefined,
      name: undefined,
      major: undefined,
      position: undefined,
    });
  };

  const handleRemoveAchievement = (index: number) => {
    if (fields.length === 1) {
      return toast({
        title: "Error",
        description: t("atLeast"),
        variant: "destructive",
      });
    }

    remove(index);
  };

  const renderAchievementFields = (index: number) => {
    switch (form.watch(`achievements.${index}.achievementType`)) {
      case ACHIEVEMENT_TYPES.EXPERIENCE:
        return (
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={`achievements.${index}.position`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("position")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("position")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case ACHIEVEMENT_TYPES.EDUCATION:
        return (
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={`achievements.${index}.major`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("major")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("major")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case ACHIEVEMENT_TYPES.CERTIFICATION:
        return (
          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={`achievements.${index}.name`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-5">
          <motion.div className="flex-between" variants={childVariants}>
            <h2 className="text-lg font-medium text-primary">
              {t("achievement")} #{index + 1}
            </h2>

            <button
              type="button"
              onClick={() => handleRemoveAchievement(index)}
            >
              <XIcon
                size={16}
                className="rounded-full text-primary hover:border hover:border-destructive hover:text-destructive"
              />
            </button>
          </motion.div>

          <div
            className={cn("grid grid-cols-2 gap-5 max-sm:grid-cols-1", {
              "grid-cols-3":
                form.watch(`achievements.${index}.achievementType`) !==
                undefined,
            })}
          >
            <motion.div variants={childVariants} className="w-full">
              <FormField
                control={form.control}
                name={`achievements.${index}.achievementType`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required>{t("type")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn("text-sm", {
                            "text-muted-foreground": !field.value,
                          })}
                        >
                          <SelectValue placeholder={t("type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ACHIEVEMENT_TYPES).map((item) => (
                          <SelectItem key={item} value={item}>
                            {t(item.toLowerCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {renderAchievementFields(index)}

            <motion.div className="w-full" variants={childVariants}>
              <FormField
                control={form.control}
                name={`achievements.${index}.organization`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required>{t("organization")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("organization")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <motion.div className="w-full" variants={childVariants}>
              <FormField
                control={form.control}
                name={`achievements.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required htmlFor="start-date">
                      {t("startDate")}
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
                        id="start-date"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={t("startDate")}
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
            </motion.div>

            <motion.div className="w-full" variants={childVariants}>
              <FormField
                control={form.control}
                name={`achievements.${index}.endDate`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="end-date">{t("endDate")}</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        id="end-date"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={t("endDate")}
                        displayFormat={{ hour24: "dd/MM/yyyy" }}
                        granularity="day"
                        locale={vi}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <motion.div className="w-full" variants={childVariants}>
            <FormField
              control={form.control}
              name={`achievements.${index}.description`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("description")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div className="w-full" variants={childVariants}>
            <Separator />
          </motion.div>
        </div>
      ))}

      <motion.div className="flex-center" variants={childVariants}>
        <Button
          variant="outline"
          type="button"
          className="flex-center gap-2"
          onClick={handleAddAchievement}
        >
          <PlusIcon size={16} />
          {t("addAchievement")}
        </Button>
      </motion.div>
    </>
  );
};
export default AchievementForm;
