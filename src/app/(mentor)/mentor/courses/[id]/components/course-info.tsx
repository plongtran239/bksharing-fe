"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import categoryApi from "@/apis/category.api";
import courseApi from "@/apis/course.api";
import DateInput from "@/components/date-input";
import FileInput from "@/components/file-input";
import Loader from "@/components/loader";
import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useToast } from "@/hooks/use-toast";
import { useUploadFile } from "@/hooks/use-upload-file";
import {
  convertDateToLocaleDateString,
  convertToCapitalizeCase,
} from "@/lib/utils";
import {
  CategoryType,
  CourseDetailType,
  CourseRequest,
  CourseRequestType,
} from "@/schemas";

const CourseInfo = ({
  course,
  isEdit,
  setIsEdit,
}: {
  course: CourseDetailType;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const {
    file,
    setFile,
    uploadFile,
    isLoading: uploadFileLoading,
  } = useUploadFile({
    resourceType: RESOURCE_TYPE.IMAGE.toLowerCase(),
    folder: FOLDER.IMAGES.toLowerCase(),
  });

  const form = useForm<CourseRequestType>({
    resolver: zodResolver(CourseRequest),
    defaultValues: {
      ...course,
      imageId: course.image?.fileId,
      categoryId: course.category.id,
      objectives: course.objectives.length > 0 ? course.objectives : [""],
      prerequisites:
        course.prerequisites.length > 0 ? course.prerequisites : [],
      startDate: new Date(Number(course.startDate)),
      endDate: new Date(Number(course.endDate)),
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const {
        payload: { data },
      } = await categoryApi.getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    Object.values(form.formState.errors).forEach((error) => {
      if (error.message) {
        toast({
          title: "Error",
          description: "Some fields are invalid",
          variant: "destructive",
        });
      }
    });
  }, [form.formState.errors, toast]);

  useEffect(() => {
    setIsEdit(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  const onSubmit = async (values: CourseRequestType) => {
    try {
      setIsLoading(true);

      if (file) {
        const result = await uploadFile(file);

        if (!result) {
          return;
        }

        values.imageId = result.fileId;
      }

      await courseApi.updateCourse(course.id, values);

      toast({
        title: "Success",
        description: "Course information updated successfully",
      });

      setIsEdit(false);

      router.refresh();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-between">
        <h2 className="text-xl font-semibold text-secondary-foreground">
          Information
        </h2>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={
            isLoading || uploadFileLoading || (!Boolean(file) && !isEdit)
          }
        >
          {isLoading || uploadFileLoading ? <Loader /> : "Save"}
        </Button>
      </div>

      <Separator className="my-5" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 pb-10"
        >
          <div className="space-y-1">
            <Label>Course Image</Label>
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
                <div className="text-center">
                  <p className="font-medium text-black">
                    Important guidelines:
                  </p>
                  <p>PNG, JPG, or JPEG format</p>
                  <p>Recommanded size is 750x422 pixels (16:9) </p>
                </div>
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" required>
                  Course Name
                </FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="
                    e.g. This course will teach you how to create a website from scratch using HTML, CSS, and JavaScript.
                  "
                    id="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-4 gap-5">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Category</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value.toString()}
                      onValueChange={(value) =>
                        field.onChange({
                          target: { value: parseInt(value) },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a category"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price" required>
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="price"
                      type="number"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange({
                          target: { value: Number(e.target.value) || "" },
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="targetAudiences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Target Audience</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={Object.values(TARGET_AUDIENCE).map(
                          (audience) => ({
                            label: convertToCapitalizeCase(audience),
                            value: audience,
                          })
                        )}
                        defaultValue={field.value}
                        onValueChange={(value) => {
                          field.onChange({
                            target: { value },
                          });
                        }}
                        maxCount={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="startDate" required>
                    Start Date
                  </FormLabel>
                  <FormControl>
                    <DateInput
                      id="startDate"
                      value={field.value}
                      defaultValue={convertDateToLocaleDateString(field.value)}
                      onChange={(value) => {
                        field.onChange({
                          target: { value },
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="endDate" required>
                    End Date
                  </FormLabel>
                  <FormControl>
                    <DateInput
                      id="endDate"
                      value={field.value}
                      defaultValue={convertDateToLocaleDateString(field.value)}
                      onChange={(value) => {
                        field.onChange({
                          target: { value },
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="objectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Objectives (at least 1)</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    {field.value.map((objective, index) => (
                      <div key={index}>
                        <div className="flex gap-2">
                          <Input
                            placeholder="e.g. Learn how to create a website"
                            value={objective}
                            onChange={(e) => {
                              const newObjectives = [...field.value];
                              newObjectives[index] = e.target.value;
                              field.onChange({
                                target: {
                                  value: newObjectives,
                                },
                              });
                            }}
                          />
                          <Button
                            type="button"
                            className="px-3"
                            onClick={() => {
                              field.onChange({
                                target: {
                                  value: field.value.filter(
                                    (_, i) => i !== index
                                  ),
                                },
                              });
                            }}
                          >
                            <TrashIcon size={16} />
                          </Button>
                        </div>
                        {form.formState.errors.objectives &&
                          form.formState.errors.objectives[index] && (
                            <p className="mt-1 text-[12.8px] font-medium text-red-500">
                              {form.formState.errors.objectives[index].message}
                            </p>
                          )}
                      </div>
                    ))}
                  </div>
                </FormControl>
                <Button
                  variant="ghost"
                  type="button"
                  className="flex-center gap-2 px-3 text-primary"
                  onClick={() => {
                    field.onChange({
                      target: { value: [...field.value, ""] },
                    });
                  }}
                >
                  <PlusIcon size={16} />
                  Add more objective
                </Button>
                {form.formState.errors.objectives && (
                  <p className="mt-1 text-[12.8px] font-medium text-red-500">
                    {form.formState.errors.objectives.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prerequisites"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prerequisites / Requirements</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    {field.value.map((prerequisite, index) => (
                      <div key={index}>
                        <div className="flex gap-2">
                          <Input
                            placeholder="e.g. Basic knowledge of HTML"
                            value={prerequisite}
                            onChange={(e) => {
                              const newPrerequisites = [...field.value];
                              newPrerequisites[index] = e.target.value;
                              field.onChange({
                                target: {
                                  value: newPrerequisites,
                                },
                              });
                            }}
                          />
                          <Button
                            type="button"
                            className="px-3"
                            onClick={() => {
                              field.onChange({
                                target: {
                                  value: field.value.filter(
                                    (_, i) => i !== index
                                  ),
                                },
                              });
                            }}
                          >
                            <TrashIcon size={16} />
                          </Button>
                        </div>
                        {form.formState.errors.prerequisites &&
                          form.formState.errors.prerequisites[index] && (
                            <p className="mt-1 text-[12.8px] font-medium text-red-500">
                              {
                                form.formState.errors.prerequisites[index]
                                  .message
                              }
                            </p>
                          )}
                      </div>
                    ))}
                  </div>
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-center gap-2 px-3 text-primary"
                  onClick={() => {
                    field.onChange({
                      target: { value: [...field.value, ""] },
                    });
                  }}
                >
                  <PlusIcon size={16} />
                  Add more prerequisite / requirement
                </Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
export default CourseInfo;
