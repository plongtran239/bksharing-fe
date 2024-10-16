import http from "@/lib/http";
import {
  MeetingResponseType,
  MeetingsResponseType,
} from "@/schemas/meeting/meeting.schema";

const MeetingApi = {
  getMeetings: (sessionToken: string) => {
    return http.get<MeetingsResponseType>("/admin/audio-call", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });
  },

  getDetailMeeting: (sessionToken: string, meetingId: string) => {
    return http.get<MeetingResponseType>(`/admin/audio-call/${meetingId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },
};

export default MeetingApi;
