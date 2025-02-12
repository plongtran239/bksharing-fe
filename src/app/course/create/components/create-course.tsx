"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import courseApi from "@/apis/course.api";
import ChooseCategory from "@/app/course/create/components/choose-category";
import InputInfo from "@/app/course/create/components/input-info";
import PrerequisiteObjective from "@/app/course/create/components/prerequisite-obj";
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
      name: "",
      description: "",
      categoryId: undefined,
      prerequisites: [],
      limitOfStudents: undefined,
      status: COURSE_STATUS.DRAFT,
      objectives: [],
      price: undefined,
      targetAudiences: [],
      startDate: undefined,
      endDate: undefined,
      isPublic: false,
      imageId: undefined,
      totalDuration: undefined,
    },
  });

  const isDisabledNext = () => {
    switch (step) {
      case 1:
        return (
          !form.watch("name") ||
          !form.watch("totalDuration") ||
          !form.watch("limitOfStudents") ||
          form.watch("totalDuration") < 1 ||
          form.watch("limitOfStudents") < 1 ||
          form.watch("totalDuration") > 10 ||
          form.watch("limitOfStudents") > 10
        );
      case 2:
        return !form.watch("categoryId");
      case 3:
        return (
          form.watch("objectives").length === 1 && !form.watch("objectives")[0]
        );
      case 4:
        return (
          !form.watch("price") || form.watch("targetAudiences").length === 0
        );
    }

    return false;
  };

  const handleCreateCourse = async () => {
    setIsLoading(true);

    try {
      await courseApi.createCourse(form.getValues());

      router.push("/mentor/courses");

      toast({
        title: "Thành công",
        description: "Tạo khóa học thành công!",
      });
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProgressLayout
      totalSteps={4}
      step={step}
      setStep={setStep}
      isDisabledNext={isDisabledNext}
      handleFinish={handleCreateCourse}
      isLoading={isLoading}
    >
      {/* Content */}
      <div className="h-[calc(100vh-75px-4px-77px)] py-10">
        {step === 1 && <InputInfo form={form} />}

        {step === 2 && <ChooseCategory form={form} />}

        {step === 3 && <PrerequisiteObjective form={form} />}

        {step === 4 && <TargetAudiencePrice form={form} />}

        {/* {step === 5 && <SetDate form={form} />} */}
      </div>
    </ProgressLayout>
  );
};
export default CreateCourse;
