"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Channel as StreamChannel, StreamChat } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import { chatTokenProvider } from "@/actions/chat.action";
import meetingApi from "@/apis/meeting.api";
import envConfig from "@/config";
import { ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";

const apiKey = envConfig.streamConfig.NEXT_PUBLIC_STREAM_API_KEY;

const MeetingChat = () => {
  const pathname = usePathname();

  const channelId = pathname.split("-")[1];

  const { user } = useAppContext();

  const [client, setClient] = useState<StreamChat | undefined>(undefined);

  const [channel, setChannel] = useState<StreamChannel | undefined>(undefined);

  useEffect(() => {
    async function initChat() {
      if (!user) {
        return;
      }

      const {
        payload: { data: participants },
      } = await meetingApi.getParticipantsByMeetingId(Number(channelId));

      const participantIds = participants.map((participant) =>
        participant.accountId.toString()
      );

      const chatClient = StreamChat.getInstance(apiKey);

      chatClient.connectUser(
        {
          id: user.id.toString(),
          name: user.name,
        },
        () => chatTokenProvider(user.id.toString())
      );

      setClient(chatClient);

      if (user.accountType === ROLES.MENTOR) {
        const channel = chatClient.channel(
          "messaging",
          "meeting-chat-" + channelId,
          {
            members: participantIds,
          }
        );
        setChannel(channel);
      } else {
        const channel = await chatClient.queryChannels(
          { type: "messaging", id: { $in: ["meeting-chat-" + channelId] } },
          { last_message_at: -1 }
        );
        setChannel(channel[0]);
      }
    }

    initChat();
  }, [channelId, user]);

  return (
    <>
      {client && (
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      )}
    </>
  );
};
export default MeetingChat;
