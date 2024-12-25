import { z } from "zod";

import { MIN_DATE } from "@/constants/date";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";

const AchivementRequest = z
  .object({
    achievementType: z.nativeEnum(ACHIEVEMENT_TYPES),
    organization: z
      .string()
      .trim()
      .min(1, {
        message: "must be at least 1 character",
      })
      .max(256, {
        message: "must be at most 256 characters",
      }),
    description: z.string().trim(),
    startDate: z.date().min(new Date(MIN_DATE), {
      message: `must be greater than ${MIN_DATE}`,
    }),
    endDate: z
      .date()
      .min(new Date(MIN_DATE), {
        message: `must be greater than ${MIN_DATE}`,
      })
      .optional(),
    isCurrent: z.boolean().optional(),
  })
  .extend({
    position: z.string().trim().optional(), // only for EXPERIENCE
    major: z.string().trim().optional(), // only for EDUCATION
    name: z.string().trim().optional(), // only for CERTIFICATION
  })
  .superRefine(
    ({ startDate, endDate, achievementType, position, major, name }, ctx) => {
      if (endDate && startDate >= endDate) {
        ctx.addIssue({
          code: "custom",
          message: "must be greater than start date",
          path: ["endDate"],
        });
      }

      switch (achievementType) {
        case ACHIEVEMENT_TYPES.EXPERIENCE:
          if (!position) {
            ctx.addIssue({
              code: "custom",
              message: "required",
              path: ["position"],
            });
          }
          break;
        case ACHIEVEMENT_TYPES.EDUCATION:
          if (!major) {
            ctx.addIssue({
              code: "custom",
              message: "required",
              path: ["major"],
            });
          }
          break;
        case ACHIEVEMENT_TYPES.CERTIFICATION:
          if (!name) {
            ctx.addIssue({
              code: "custom",
              message: "required",
              path: ["name"],
            });
          }
          break;
      }
    }
  );

const Achievement = z
  .object({
    id: z.number().optional(),
    type: z.nativeEnum(ACHIEVEMENT_TYPES),
    organization: z.string().trim(),
    description: z.string().trim(),
    startDate: z.string().trim(),
    endDate: z.string().trim(),
    isCurrent: z.boolean().optional(),
  })
  .extend({
    position: z.string().trim().optional(), // only for EXPERIENCE
    major: z.string().trim().optional(), // only for EDUCATION
    name: z.string().trim().optional(), // only for CERTIFICATION
  });

type AchivementRequestType = z.infer<typeof AchivementRequest>;

type AchivementType = z.infer<typeof Achievement>;

export { AchivementRequest, Achievement };

export type { AchivementRequestType, AchivementType };
