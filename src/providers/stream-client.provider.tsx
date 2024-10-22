"use client";

import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import { tokenProvider } from "@/actions/stream.action";
import envConfig from "@/config";
import { useAppContext } from "@/providers/app.provider";

const StreamClientProvider = ({ children }: { children: React.ReactNode }) => {
  const apiKey = envConfig.NEXT_PUBLIC_STREAM_API_KEY;

  const { user } = useAppContext();

  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>();

  useEffect(() => {
    if (!apiKey) {
      throw new Error("Stream API key is not set");
    }

    if (user) {
      const client = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user: {
          id: user.id.toString(),
          name: user.name,
          type: "authenticated",
        },
        tokenProvider: () => tokenProvider(user.id.toString()),
      });

      setVideoClient(client);
    }
  }, [apiKey, user]);

  if (!videoClient) {
    return children;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
export default StreamClientProvider;
