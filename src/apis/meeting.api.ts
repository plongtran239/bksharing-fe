import http from "@/lib/http";
import { MeetingsResponseType } from "@/schemas/meeting/meeting.schema";

const MeetingApi = {
  getMeetings: (sessionToken: string) => {
    return http.get<MeetingsResponseType>("/audio-call", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },
};

export default MeetingApi;
