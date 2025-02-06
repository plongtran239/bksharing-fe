import http from "@/lib/http";
import {
  DetailResponseType,
  ListResponseType,
  MeetingHistoryType,
  MeetingType,
  ParticipantType,
} from "@/schemas";

const meetingApi = {
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

  getMeetingHistory: (sessionToken: string, meetingId: number) => {
    return http.get<ListResponseType<MeetingHistoryType>>(
      `/audio-call/${meetingId}/histories`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        cache: "no-store",
      }
    );
  },

  getParticipantsByMeetingId: (meetingId: number) =>
    http.get<DetailResponseType<ParticipantType[]>>(
      `/audio-call/${meetingId}/participants`
    ),
};

export default meetingApi;
