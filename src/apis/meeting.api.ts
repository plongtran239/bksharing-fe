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

  getDetailMeeting: (sessionToken: string, meetingId: number) => {
    return http.get<MeetingResponseType>(`/admin/audio-call/${meetingId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },

  startMeeting: (meetingId: number) => {
    return http.patch(`/audio-call/${meetingId}/start`);
  },

  endMeeting: (meetingId: number) => {
    return http.patch(`/audio-call/${meetingId}/end`);
  },

  joinMeeting: (meetingId: number) => {
    return http.patch(`/audio-call/${meetingId}/join`);
  },
};

export default MeetingApi;
