import http from "@/lib/http";
import { ListResponseType, MeetingType } from "@/schemas";

const MeetingApi = {
  getAdminMeetings: (sessionToken: string) => {
    return http.get<ListResponseType<MeetingType>>("/admin/audio-call", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });
  },

  getClientMeetings: (sessionToken: string) => {
    return http.get<ListResponseType<MeetingType>>("/client/audio-call", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
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

  leaveMeeting: (meetingId: number) => {
    return http.patch(`/audio-call/${meetingId}/leave`);
  },
};

export default MeetingApi;
