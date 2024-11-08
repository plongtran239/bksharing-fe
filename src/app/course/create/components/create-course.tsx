"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import courseApi from "@/apis/course.api";
import ChooseCategory from "@/app/course/create/components/choose-category";
import ChooseType from "@/app/course/create/components/choose-type";
import InputInfo from "@/app/course/create/components/input-info";
import PrerequisiteObjective from "@/app/course/create/components/prerequisite-obj";
import SetDate from "@/app/course/create/components/set-date";
import TargetAudiencePrice from "@/app/course/create/components/target-price";
import { COURSE_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import ProgressLayout from "@/layouts/progress.layout";
import { CourseRequest, CourseRequestType } from "@/schemas";

const CreateCourse = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CourseRequestType>({
    resolver: zodResolver(CourseRequest),
    defaultValues: {
      courseType: undefined,
      name: "",
      description: "",
      categoryId: undefined,
      prerequisites: [],
      status: COURSE_STATUS.DRAFT,
      objectives: [],
      price: undefined,
      targetAudiences: [],
      startDate: undefined,
      endDate: undefined,
      isPublic: false,
      imageId: undefined,
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
    <ProgressLayout
      totalSteps={6}
      step={step}
      setStep={setStep}
      isDisabledNext={isDisabledNext}
      handleFinish={handleCreateCourse}
      isLoading={isLoading}
      exitLink="/mentor/courses"
    >
      {/* Content */}
      <div className="h-[calc(100vh-75px-4px-77px)] py-10">
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
    </ProgressLayout>
  );
};
export default CreateCourse;
