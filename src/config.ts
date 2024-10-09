import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_STREAM_API_KEY: z.string(),
});

const config = configSchema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_STREAM_API_KEY: process.env.NEXT_PUBLIC_STREAM_API_KEY,
});

if (!config.success) {
  console.error(config.error.issues);
  throw new Error("Invalid configuration in .env file");
}

const envConfig = config.data;

export default envConfig;
