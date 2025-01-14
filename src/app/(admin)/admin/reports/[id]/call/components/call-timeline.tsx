import meetingApi from "@/apis/meeting.api";
import { TimelineLayout } from "@/components/timeline-layout";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { convertMilisecondsToLocaleString } from "@/lib/utils";

const CallTimeline = async ({ callId }: { callId: number }) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await meetingApi.getMeetingHistory(sessionToken, callId);

  const timelineData = data
    .flatMap((item) => [
      {
        id: item.id * 10 + 1, // Thêm hậu tố để phân biệt
        title: item.AudioParticipant.name,
        description: "Tham gia",
        avatar:
          item.AudioParticipant.thumbnail?.originalUrl ||
          "/images/default-user.png",
        role: item.AudioParticipant.role,
        type: 0,
        time: convertMilisecondsToLocaleString(item.joinedAt),
        timestamp: parseInt(item.joinedAt),
      },
      {
        id: item.id * 10 + 2, // Thêm hậu tố để phân biệt
        title: item.AudioParticipant.name,
        description: "Rời đi",
        avatar:
          item.AudioParticipant.thumbnail?.originalUrl ||
          "/images/default-user.png",
        role: item.AudioParticipant.role,
        type: 1,
        time: item.leftAt ? convertMilisecondsToLocaleString(item.leftAt) : "",
        timestamp: item.leftAt ? parseInt(item.leftAt) : 0,
      },
    ])
    .sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="space-y-5">
      <TimelineLayout data={timelineData} />
    </div>
  );
};
export default CallTimeline;
