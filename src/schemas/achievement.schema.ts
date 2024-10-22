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
        message: "Organization must be at least 1 character",
      })
      .max(256, {
        message: "Organization must be at most 256 characters",
      }),
    description: z.string().trim(),
    startDate: z
      .date()
      .min(new Date(MIN_DATE), {
        message: `Start date must be greater than ${MIN_DATE}`,
      })
      .max(new Date(), {
        message: "Start date must be less than current date",
      }),
    endDate: z
      .date()
      .min(new Date(MIN_DATE), {
        message: `Start date must be greater than ${MIN_DATE}`,
      })
      .max(new Date(), {
        message: "Start date must be less than current date",
      })
      .optional(),
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
          message: "End date must be greater than start date",
          path: ["endDate"],
        });
      }

      switch (achievementType) {
        case ACHIEVEMENT_TYPES.EXPERIENCE:
          if (!position) {
            ctx.addIssue({
              code: "custom",
              message: "Position is required",
              path: ["position"],
            });
          }
          break;
        case ACHIEVEMENT_TYPES.EDUCATION:
          if (!major) {
            ctx.addIssue({
              code: "custom",
              message: "Major is required",
              path: ["major"],
            });
          }
          break;
        case ACHIEVEMENT_TYPES.CERTIFICATION:
          if (!name) {
            ctx.addIssue({
              code: "custom",
              message: "Name is required",
              path: ["name"],
            });
          }
          break;
      }
    }
  );

const Achievement = z
  .object({
    type: z.nativeEnum(ACHIEVEMENT_TYPES),
    organization: z.string().trim(),
    description: z.string().trim(),
    startDate: z.string().trim(),
    endDate: z.string().trim(),
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
