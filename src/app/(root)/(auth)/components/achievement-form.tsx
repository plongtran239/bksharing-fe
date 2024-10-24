import { motion } from "framer-motion";
import { PlusIcon, XIcon } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import DateInput from "@/components/date-input";
import { Button } from "@/components/ui/button";
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
import { cn, convertToCapitalizeCase } from "@/lib/utils";
import { MentorRegisterRequestType } from "@/schemas";

interface IProps {
  form: UseFormReturn<MentorRegisterRequestType>;
}

const AchievementForm = ({ form }: IProps) => {
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
        description: "At least one achievement is required",
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
                  <FormLabel required>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="position" {...field} />
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
                  <FormLabel required>Major</FormLabel>
                  <FormControl>
                    <Input placeholder="major" {...field} />
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
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
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
              Achievement #{index + 1}
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

          <div className="flex-between gap-5 max-sm:flex-col">
            <motion.div variants={childVariants} className="w-full">
              <FormField
                control={form.control}
                name={`achievements.${index}.achievementType`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required>Type</FormLabel>
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
                          <SelectValue placeholder="select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ACHIEVEMENT_TYPES).map((item) => (
                          <SelectItem key={item} value={item}>
                            {convertToCapitalizeCase(item)}
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
                    <FormLabel required>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <div className="flex-between gap-5 max-sm:flex-col">
            <motion.div className="w-full" variants={childVariants}>
              <FormField
                control={form.control}
                name={`achievements.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required htmlFor="start-date">
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <DateInput id="start-date" {...field} />
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
                    <FormLabel htmlFor="end-date">End Date</FormLabel>
                    <FormControl>
                      <DateInput id="end-date" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} />
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
          Add Achievement
        </Button>
      </motion.div>
    </>
  );
};
export default AchievementForm;
