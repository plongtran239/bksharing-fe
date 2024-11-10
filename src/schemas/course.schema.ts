import { z } from "zod";

import { MIN_DATE } from "@/constants/date";
import { COURSE_STATUS, COURSE_TYPE, TARGET_AUDIENCE } from "@/constants/enum";

const SectionRequest = z.object({
  id: z.number().optional(),
  title: z.string().min(3, {
    message: "Section title must be at least 3 character long",
  }),
  description: z.string().optional(),
  duration: z.number().min(1, {
    message: "Duration must be at least 1",
  }),
  isPublic: z.boolean().default(false),
  files: z.array(z.object({ fileId: z.number(), isPublic: z.boolean() })),
});

const SectionFile = z.object({
  fileId: z.number(),
  name: z.string(),
  size: z.number(),
  url: z.string(),
  isPublic: z.boolean(),
});

const Section = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  isPublic: z.boolean(),
  files: z.array(SectionFile),
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
  status: z.nativeEnum(COURSE_STATUS),
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
  mentor: z.object({ id: z.number(), name: z.string() }),
});

const Course = CourseBase.extend({
  countOfSections: z.number(),
});

const CourseDetail = CourseBase.extend({
  description: z.string().optional(),
  isPublic: z.boolean(),
  isApproved: z.boolean(),
  limitOfStudents: z.number(),
  sections: z.array(Section),
  createdAt: z.date(),
});

type SectionRequestType = z.infer<typeof SectionRequest>;
type CourseRequestType = z.infer<typeof CourseRequest>;
type SectionType = z.infer<typeof Section>;
type SectionFileType = z.infer<typeof SectionFile>;
type CourseType = z.infer<typeof Course>;
type CourseDetailType = z.infer<typeof CourseDetail>;

export {
  CourseRequest,
  SectionRequest,
  Course,
  CourseDetail,
  SectionFile,
  Section,
};

export type {
  CourseRequestType,
  SectionRequestType,
  CourseType,
  CourseDetailType,
  SectionFileType,
  SectionType,
};
