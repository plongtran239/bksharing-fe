import { z } from "zod";

import { COURSE_TYPE, TARGET_AUDIENCE } from "@/constants/enum";

const Section = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  isPublic: z.boolean(),
  files: z.array(z.object({ fileId: z.number(), isPublic: z.boolean() })),
});

const Course = z.object({
  courseType: z.nativeEnum(COURSE_TYPE),
  name: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
  categoryId: z.number(),
  imageId: z.number(),
  price: z.number(),
  prerequisites: z.array(z.string()),
  objectives: z.array(z.string()),
  targetAudiences: z.array(z.nativeEnum(TARGET_AUDIENCE)),
  startDate: z.date(),
  endDate: z.date(),
  sections: z.array(Section).optional(),
});

type CourseType = z.infer<typeof Course>;

type SectionType = z.infer<typeof Section>;

export { Course, Section };

export type { CourseType, SectionType };
