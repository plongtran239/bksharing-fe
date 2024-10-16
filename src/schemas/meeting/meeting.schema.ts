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
});

const MeetingResponse = z.object({
  data: Meeting.extend({
    participants: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        gender: z.nativeEnum(GENDERS),
        accountType: z.nativeEnum(ROLES),
        dob: z.string(),
      })
    ),
  }),
  message: z.string(),
});

const MeetingsResponse = z.object({
  data: z.array(Meeting),
  total: z.number(),
});

type MeetingType = z.infer<typeof Meeting>;

type MeetingResponseType = z.infer<typeof MeetingResponse>;

type MeetingsResponseType = z.infer<typeof MeetingsResponse>;

export {
  Meeting,
  type MeetingType,
  MeetingResponse,
  type MeetingResponseType,
  MeetingsResponse,
  type MeetingsResponseType,
};
