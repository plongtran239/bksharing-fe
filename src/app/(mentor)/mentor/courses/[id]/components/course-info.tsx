"use client";

import { PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import categoryApi from "@/apis/category.api";
import DateInput from "@/components/date-input";
import FileInput from "@/components/file-input";
import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FOLDER, RESOURCE_TYPE, TARGET_AUDIENCE } from "@/constants/enum";
import { useUploadFile } from "@/hooks/use-upload-file";
import { convertToCapitalizeCase } from "@/lib/utils";
import { CategoryType, CourseDetailType } from "@/schemas";

const CourseInfo = ({ course }: { course: CourseDetailType }) => {
  const [objectives, setObjectives] = useState<string[]>([""]);
  const [prerequisites, setPrerequisites] = useState<string[]>([""]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const {
        payload: { data },
      } = await categoryApi.getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const { file, setFile } = useUploadFile({
    resourceType: RESOURCE_TYPE.IMAGE.toLowerCase(),
    folder: FOLDER.IMAGES.toLowerCase(),
  });

  return (
    <>
      <div className="flex-between">
        <h2 className="text-xl text-secondary-foreground">
          Course Information
        </h2>
        <Button>Save Changes</Button>
      </div>

      <Separator className="my-5" />

      <div className="space-y-5 pb-10">
        {/* Image */}
        <div className="space-y-1">
          <Label htmlFor="image">Course Image</Label>
          <div className="flex items-center gap-5">
            <div className="relative h-[211px] w-[375px]">
              <Image
                src={
                  file
                    ? URL.createObjectURL(file)
                    : course.image?.originalUrl || "/images/placeholder-2.jpg"
                }
                alt={course.name}
                fill
                priority
                sizes="100px"
                className="rounded-xl"
              />
            </div>
            <div className="flex-center flex-1 flex-col space-y-5">
              <p>Important guidelines: 750x422 pixels;</p>
              <p>.jpg, .jpeg, or .png. no text on the image.</p>
              <FileInput
                id="course-image"
                accept=".png, .jpg, .jpeg"
                value={file?.name}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  } else {
                    setFile(undefined);
                  }
                }}
                classname="w-1/2"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <Label htmlFor="name" required>
            Course Name
          </Label>
          <Input />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <Label htmlFor="category" required>
            Category
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a category"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Objective */}
        <div className="space-y-1">
          <Label htmlFor="objective" required>
            Objectives (at least 1)
          </Label>
          <div className="space-y-3">
            {objectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <Input />
                <Button
                  className="px-3"
                  onClick={() => {
                    const newObjectives = [...objectives];
                    newObjectives.splice(index, 1);
                    setObjectives(newObjectives);
                  }}
                >
                  <TrashIcon size={16} />
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="flex-center gap-2 px-3 text-primary"
            onClick={() => setObjectives([...objectives, ""])}
          >
            <PlusIcon size={16} />
            Add more objective
          </Button>
        </div>

        {/* Prerequisites */}
        <div className="space-y-1">
          <Label htmlFor="prerequisites">Prerequisites / Requirements</Label>
          <div className="space-y-3">
            {prerequisites.map((prerequisite, index) => (
              <div key={index} className="flex gap-2">
                <Input />
                <Button
                  className="px-3"
                  onClick={() => {
                    const newPrerequisites = [...prerequisites];
                    newPrerequisites.splice(index, 1);
                    setPrerequisites(newPrerequisites);
                  }}
                >
                  <TrashIcon size={16} />
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="flex-center gap-2 px-3 text-primary"
            onClick={() => setPrerequisites([...prerequisites, ""])}
          >
            <PlusIcon size={16} />
            Add more prerequisite / requirement
          </Button>
        </div>

        <div className="flex-center gap-5">
          {/* Target Audience */}
          <div className="flex-1 space-y-1">
            <Label htmlFor="targetAudience" required>
              Target Audience
            </Label>
            <MultiSelect
              id="targetAudiences"
              options={Object.values(TARGET_AUDIENCE).map((audience) => ({
                label: convertToCapitalizeCase(audience),
                value: audience,
              }))}
              onValueChange={(value) => {
                console.log({ value });
              }}
              maxCount={4}
            />
          </div>

          {/* Price */}
          <div className="flex-1 space-y-1">
            <Label htmlFor="price" required>
              Price
            </Label>
            <Input type="number" />
          </div>
        </div>

        <div className="flex-center gap-5">
          {/* Start Date */}
          <div className="flex-1 space-y-1">
            <Label htmlFor="startDate" required>
              Start Date
            </Label>
            <DateInput id="startDate" value={undefined} onChange={() => {}} />
          </div>

          {/* End Date */}
          <div className="flex-1 space-y-1">
            <Label htmlFor="endDate" required>
              End Date
            </Label>
            <DateInput id="endDate" value={undefined} onChange={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseInfo;
