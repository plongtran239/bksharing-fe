import { z } from "zod";

import { MIN_DATE } from "@/constants/date";
import { COURSE_STATUS, COURSE_TYPE, TARGET_AUDIENCE } from "@/constants/enum";

const Section = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  isPublic: z.boolean(),
  files: z.array(z.object({ fileId: z.number(), isPublic: z.boolean() })),
});

const CourseRequest = z
  .object({
    courseType: z.nativeEnum(COURSE_TYPE),
    name: z.string().min(1, {
      message: "Course name must be at least 1 character long",
    }),
    description: z.string().optional(),
    categoryId: z.number(),
    objectives: z
      .array(
        z.string().min(1, {
          message: "Objective must be at least 1 character long",
        })
      )
      .min(1, {
        message: "Course must have at least 1 objective",
      }),
    prerequisites: z.array(
      z.string().min(1, {
        message: "Prerequisite must be at least 1 character long",
      })
    ),
    price: z.number().min(1000, { message: "Price must be at least 1000" }),
    targetAudiences: z
      .array(z.nativeEnum(TARGET_AUDIENCE))
      .min(1, { message: "Course must have at least 1 target audience" }),
    startDate: z.date(),
    endDate: z.date().min(new Date(MIN_DATE), {
      message: `must be greater than ${MIN_DATE}`,
    }),
    status: z.nativeEnum(COURSE_STATUS).default(COURSE_STATUS.DRAFT),
    isPublic: z.boolean().default(false),
    imageId: z.number().optional(),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (endDate && startDate >= endDate) {
      ctx.addIssue({
        code: "custom",
        message: "must be greater than start date",
        path: ["endDate"],
      });
    }
  });

const CourseBase = z.object({
  id: z.number(),
  name: z.string(),
  courseType: z.nativeEnum(COURSE_TYPE),
  category: z.object({ id: z.number(), name: z.string() }),
  objectives: z.array(z.string()),
  prerequisites: z.array(z.string()),
  price: z.number(),
  targetAudiences: z.array(z.nativeEnum(TARGET_AUDIENCE)),
  totalDuration: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  image: z
    .object({
      fileId: z.number(),
      originalUrl: z.string(),
    })
    .nullable(),
});

const Course = CourseBase.extend({
  countOfSections: z.number(),
  mentor: z.object({ id: z.number(), name: z.string() }),
});

const CourseDetail = CourseBase.extend({
  description: z.string().optional(),
  status: z.nativeEnum(COURSE_STATUS),
  isPublic: z.boolean(),
  isApproved: z.boolean(),
  limitOfStudents: z.number(),
  sections: z.array(Section),
  createdAt: z.date(),
});

type CourseRequestType = z.infer<typeof CourseRequest>;
type CourseType = z.infer<typeof Course>;
type CourseDetailType = z.infer<typeof CourseDetail>;
type SectionType = z.infer<typeof Section>;

export { Course, CourseDetail, CourseRequest, Section };

export type { CourseRequestType, CourseType, CourseDetailType, SectionType };
