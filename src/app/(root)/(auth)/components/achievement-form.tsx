import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { PlusIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import CERTIFICATIONS from "@/constants/certification";
import COMPANIES from "@/constants/company";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import MAJORS from "@/constants/major";
import { childVariants } from "@/constants/motion";
import ORGANIZATIONS from "@/constants/organization";
import POSITIONS from "@/constants/position";
import SCHOOLS from "@/constants/school";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { MentorRegisterRequestType } from "@/schemas";

interface IProps {
  form: UseFormReturn<MentorRegisterRequestType>;
}

const AchievementForm = ({ form }: IProps) => {
  const t = useTranslations("authPage.register.mentorForm.achievementForm");

  const tMajor = useTranslations("major");
  const tSchool = useTranslations("school");

  const tPosition = useTranslations("position");
  const tCompany = useTranslations("company");

  const tCertification = useTranslations("certification");
  const tOrganization = useTranslations("organization");

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
      isCurrent: true,
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className={cn("text-sm", {
                            "text-muted-foreground": !field.value,
                          })}
                        >
                          <SelectValue placeholder={t("position")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(POSITIONS).map((postion) => (
                          <SelectGroup key={postion.label}>
                            <SelectLabel className="font-bold">
                              {tPosition(postion.label)}
                            </SelectLabel>
                            {Object.entries(postion.subs).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {tPosition(label)}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className={cn("text-sm", {
                            "text-muted-foreground": !field.value,
                          })}
                        >
                          <SelectValue placeholder={t("major")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(MAJORS).map((major) => (
                          <SelectGroup key={major.label}>
                            <SelectLabel className="font-bold">
                              {tMajor(major.label)}
                            </SelectLabel>
                            {Object.entries(major.subs).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {tMajor(label)}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className={cn("text-sm", {
                            "text-muted-foreground": !field.value,
                          })}
                        >
                          <SelectValue placeholder={t("name")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(CERTIFICATIONS).map((cer) => (
                          <SelectGroup key={cer.label}>
                            <SelectLabel className="font-bold">
                              {tCertification(cer.label)}
                            </SelectLabel>
                            {Object.entries(cer.subs).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {tCertification(label)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
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

  const renderOrganizationField = (index: number) => {
    const renderOrganizationLabel = (index: number) => {
      switch (form.watch(`achievements.${index}.achievementType`)) {
        case ACHIEVEMENT_TYPES.EXPERIENCE:
          return t("company");

        case ACHIEVEMENT_TYPES.EDUCATION:
          return t("school");

        case ACHIEVEMENT_TYPES.CERTIFICATION:
          return t("organization");

        default:
          return t("organization");
      }
    };

    const renderOrganizationSelect = (index: number) => {
      switch (form.watch(`achievements.${index}.achievementType`)) {
        case ACHIEVEMENT_TYPES.EXPERIENCE:
          return COMPANIES;

        case ACHIEVEMENT_TYPES.EDUCATION:
          return SCHOOLS;

        case ACHIEVEMENT_TYPES.CERTIFICATION:
          return ORGANIZATIONS;

        default:
          return SCHOOLS;
      }
    };

    const renderOrganizationSelectItem = (index: number, value: string) => {
      switch (form.watch(`achievements.${index}.achievementType`)) {
        case ACHIEVEMENT_TYPES.EXPERIENCE:
          return tCompany(value);

        case ACHIEVEMENT_TYPES.EDUCATION:
          return tSchool(value);

        case ACHIEVEMENT_TYPES.CERTIFICATION:
          return tOrganization(value);

        default:
          return tSchool(value);
      }
    };

    return (
      <motion.div className="w-full" variants={childVariants}>
        <FormField
          control={form.control}
          name={`achievements.${index}.organization`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel required>{renderOrganizationLabel(index)}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      className={cn("text-sm", {
                        "text-muted-foreground": !field.value,
                      })}
                    >
                      <SelectValue
                        placeholder={renderOrganizationLabel(index)}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(renderOrganizationSelect(index)).map(
                      (major) => (
                        <SelectGroup key={major.label}>
                          <SelectLabel className="font-bold">
                            {renderOrganizationSelectItem(index, major.label)}
                          </SelectLabel>

                          {Object.values(major.subs).map((item) => (
                            <SelectItem
                              key={item as string}
                              value={item as string}
                            >
                              {renderOrganizationSelectItem(
                                index,
                                item as string
                              )}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    );
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-5">
          <motion.div className="flex-between" variants={childVariants}>
            <div className="flex-center gap-10">
              <h2 className="text-lg font-medium text-primary">
                {t("achievement")} #{index + 1}
              </h2>

              <FormField
                control={form.control}
                name={`achievements.${index}.isCurrent`}
                render={({ field }) => (
                  <FormItem className="flex-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{t("current")}</FormLabel>
                  </FormItem>
                )}
              />
            </div>

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

          <div className={cn("grid gap-5")}>
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

            {renderOrganizationField(index)}
          </div>

          <div
            className={cn("grid gap-5 max-sm:grid-cols-1", {
              "grid-cols-1": form.watch(`achievements.${index}.isCurrent`),
            })}
          >
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

            {!form.watch(`achievements.${index}.isCurrent`) && (
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
            )}
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
