import { z } from "zod";

import { COURSE_STATUS, COURSE_TYPE, TARGET_AUDIENCE } from "@/constants/enum";

const Section = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  isPublic: z.boolean(),
  files: z.array(z.object({ fileId: z.number(), isPublic: z.boolean() })),
});

const CourseRequest = z.object({
  courseType: z.nativeEnum(COURSE_TYPE),
  name: z.string(),
  description: z.string().optional(),
  categoryId: z.number(),
  objectives: z.array(z.string()),
  prerequisites: z.array(z.string()),
  price: z.number(),
  targetAudiences: z.array(z.nativeEnum(TARGET_AUDIENCE)),
  startDate: z.date(),
  endDate: z.date(),
  status: z.nativeEnum(COURSE_STATUS).default(COURSE_STATUS.DRAFT),
  isPublic: z.boolean().default(false),
  imageId: z.number().optional(),
  sections: z.array(Section).optional(),
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
});

const Course = CourseBase.extend({
  countOfSections: z.number(),
  image: z.object({ originalUrl: z.string() }).nullable(),
  mentor: z.object({ id: z.number(), name: z.string() }),
});

const CourseDetail = CourseBase.extend({
  description: z.string().optional(),
  status: z.nativeEnum(COURSE_STATUS),
  isPublic: z.boolean(),
  isApproved: z.boolean(),
  limitOfStudents: z.number(),
  sections: z.array(Section),
  image: z.object({ originalUrl: z.string() }),
  createdAt: z.date(),
});

type CourseRequestType = z.infer<typeof CourseRequest>;
type CourseType = z.infer<typeof Course>;
type CourseDetailType = z.infer<typeof CourseDetail>;
type SectionType = z.infer<typeof Section>;

export { Course, CourseDetail, CourseRequest, Section };

export type { CourseRequestType, CourseType, CourseDetailType, SectionType };
