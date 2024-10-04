"use client";

import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

// import { tokenProvider } from "@/actions/stream.action";
import envConfig from "@/config";
import { useAppContext } from "@/providers/app.provider";

const StreamClientProvider = ({ children }: { children: React.ReactNode }) => {
  const apiKey = envConfig.NEXT_PUBLIC_STREAM_API_KEY;

  const { user } = useAppContext();

  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>();

  useEffect(() => {
    // if (!user) {
    //   throw new Error("User is not set");
    // }

    if (!apiKey) {
      throw new Error("Stream API key is not set");
    }

    const client = new StreamVideoClient({
      apiKey,
      // user: {
      //   id: user.id.toString(),
      //   name: user.name,
      // },
      // tokenProvider: () => tokenProvider(user.id.toString()),
    });

    setVideoClient(client);
  }, [apiKey, user]);

  if (!videoClient) {
    return null;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
export default StreamClientProvider;
