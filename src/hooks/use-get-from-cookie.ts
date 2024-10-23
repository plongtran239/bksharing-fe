import { cookies } from "next/headers";

export const useGetFromCookie = (keys: string[]) => {
  const cookieStore = cookies();

  return keys.reduce(
    (acc, key) => {
      acc[key] = cookieStore.get(key)?.value as string;
      return acc;
    },
    {} as Record<string, string>
  );
};
