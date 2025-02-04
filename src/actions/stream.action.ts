"use server";

import { StreamClient } from "@stream-io/node-sdk";

import envConfig from "@/config";

const apiKey = envConfig.streamConfig.NEXT_PUBLIC_STREAM_API_KEY;
const secretKey = envConfig.streamConfig.NEXT_PUBLIC_STREAM_SECRET_KEY;

export const tokenProvider = async (userId: string) => {
  if (!apiKey || !secretKey) {
    throw new Error("Stream API key or secret key is not set");
  }

  const client = new StreamClient(apiKey, secretKey);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = client.generateUserToken({
    user_id: userId,
    exp,
    iat: issuedAt,
  });

  return token;
};
