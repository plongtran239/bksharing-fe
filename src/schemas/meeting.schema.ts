import { z } from "zod";

import { GENDERS, MEETING_STATUS, MEETING_TYPE, ROLES } from "@/constants/enum";

const Meeting = z.object({
  id: z.number(),
  cid: z.string(),
  title: z.string(),
  status: z.nativeEnum(MEETING_STATUS),
  type: z.nativeEnum(MEETING_TYPE),
  isPublic: z.boolean(),
  startsAt: z.string(),
  participantCount: z.number(),
  participants: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      gender: z.nativeEnum(GENDERS),
      accountType: z.nativeEnum(ROLES),
      dob: z.string(),
    })
  ),
});

enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

const MeetingHistory = z.object({
  id: z.number(),
  joinedAt: z.string(),
  leftAt: z.string().nullable(),
  AudioParticipant: z.object({
    accountId: z.number(),
    name: z.string(),
    thumbnail: z
      .object({
        originalUrl: z.string(),
      })
      .nullable(),
    role: z.nativeEnum(ROLE),
  }),
});

const Participant = z.object({
  accountId: z.number(),
  role: z.enum(["ADMIN", "USER"]),
  isInCall: z.boolean(),
});

type MeetingType = z.infer<typeof Meeting>;

type MeetingHistoryType = z.infer<typeof MeetingHistory>;

type ParticipantType = z.infer<typeof Participant>;

export { Meeting };

export type { MeetingType, MeetingHistoryType, ParticipantType };
