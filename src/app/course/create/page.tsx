"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import courseApi from "@/apis/course.api";
import ChooseCategory from "@/app/course/create/components/choose-category";
import ChooseType from "@/app/course/create/components/choose-type";
import Header from "@/app/course/create/components/header";
import InputInfo from "@/app/course/create/components/input-info";
import PrerequisiteObjective from "@/app/course/create/components/prerequisite-obj";
import SetDate from "@/app/course/create/components/set-date";
import TargetAudiencePrice from "@/app/course/create/components/target-price";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Course, CourseType } from "@/schemas";

const totalSteps = 6;

const CreateCourse = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CourseType>({
    resolver: zodResolver(Course),
    defaultValues: {
      courseType: undefined,
      name: "",
      description: "",
      categoryId: undefined,
      prerequisites: [],
      objectives: [],
      price: undefined,
      targetAudiences: [],
      startDate: undefined,
      endDate: undefined,
      isPublic: false,
      imageId: undefined,
      sections: [],
    },
  });

  const isDisabledNext = () => {
    switch (step) {
      case 1:
        return !form.watch("courseType");
      case 2:
        return !form.watch("name");
      case 3:
        return !form.watch("categoryId");
      // case 4:
      //   return (
      //     form.watch("prerequisites").length === 0 ||
      //     form.watch("objectives").length === 0
      //   );
      case 5:
        return (
          !form.watch("price") || form.watch("targetAudiences").length === 0
        );
      case 6:
        return !form.watch("startDate") || !form.watch("endDate");
    }

    return false;
  };

  const handleCreateCourse = async () => {
    setIsLoading(true);

    try {
      await courseApi.createCourse(form.getValues());

      router.push("/mentor/courses");

      toast({
        title: "Success",
        description: "Course created successfully!",
      });
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <Header step={step} total={totalSteps} />

      {/* Content */}
      <div className="h-[calc(100vh-75px-76px)]">
        <div className="py-10">
          {/* Step 1: Course type */}
          {step === 1 && <ChooseType form={form} />}

          {/* Step 2 */}
          {step === 2 && <InputInfo form={form} />}

          {/* Step 3 */}
          {step === 3 && <ChooseCategory form={form} />}

          {/* Step 4 */}
          {step === 4 && <PrerequisiteObjective form={form} />}

          {/* Step 5 */}
          {step === 5 && <TargetAudiencePrice form={form} />}

          {/* Step 6 */}
          {step === 6 && <SetDate form={form} />}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-between border-t p-5 shadow-inner">
        <Button
          className={cn({
            hidden: step === 1,
          })}
          disabled={isLoading}
          onClick={() => setStep((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Button
          className={cn({
            hidden: step === totalSteps,
          })}
          disabled={isDisabledNext()}
          onClick={() => setStep((prev) => prev + 1)}
        >
          Next
        </Button>
        <Button
          className={cn({
            hidden: step !== totalSteps,
          })}
          disabled={isDisabledNext() || isLoading}
          onClick={handleCreateCourse}
        >
          {isLoading ? <Loader /> : "Finish"}
        </Button>
      </div>
    </div>
  );
};
export default CreateCourse;
