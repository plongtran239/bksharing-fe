import { cookies } from "next/headers";

export const useGetToken = () => {
  const cookieStore = cookies();

  return cookieStore.get("sessionToken")?.value as string;
};
