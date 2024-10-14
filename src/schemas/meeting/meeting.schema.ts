import { z } from "zod";

import { MEETING_STATUS, MEETING_TYPE } from "@/constants/enum";

const Meeting = z.object({
  id: z.number(),
  title: z.string(),
  status: z.nativeEnum(MEETING_STATUS),
  type: z.nativeEnum(MEETING_TYPE),
  isPublic: z.boolean(),
  startsAt: z.string(),
  participantCount: z.number(),
});

const MeetingsResponse = z.object({
  data: z.array(Meeting),
  total: z.number(),
});

type MeetingType = z.infer<typeof Meeting>;
type MeetingsResponseType = z.infer<typeof MeetingsResponse>;

export {
  Meeting,
  type MeetingType,
  MeetingsResponse,
  type MeetingsResponseType,
};
