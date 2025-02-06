"use server";

import { StreamChat } from "stream-chat";

import envConfig from "@/config";

const apiKey = envConfig.streamConfig.NEXT_PUBLIC_STREAM_API_KEY;
const secretKey = envConfig.streamConfig.NEXT_PUBLIC_STREAM_SECRET_KEY;

export const chatTokenProvider = async (userId: string) => {
  if (!apiKey || !secretKey) {
    throw new Error("Stream API key or secret key is not set");
  }

  const client = StreamChat.getInstance(apiKey, secretKey);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const token = client.createToken(userId, exp);

  return token;
};
