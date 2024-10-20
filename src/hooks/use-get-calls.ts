import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import { useAppContext } from "@/providers/app.provider";

export const useGetCalls = () => {
  const { user } = useAppContext();

  const client = useStreamVideoClient();

  const [calls, setCalls] = useState<Call[]>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!client || !user) return;

    const loadCalls = async () => {
      setIsLoading(true);

      const userId = user.id.toString();

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: userId },
              { members: { $in: [userId] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
