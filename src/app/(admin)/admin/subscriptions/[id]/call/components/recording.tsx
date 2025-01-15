"use client";

import {
  ListRecordingsResponse,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import Link from "next/link";
import { useEffect, useState } from "react";

import Loader from "@/components/loader";

const Recording = ({ cid, reportId }: { cid: string; reportId: number }) => {
  console.log({ cid, reportId });

  const client = useStreamVideoClient();

  const [loading, setLoading] = useState(true);
  const [recordings, setRecordings] = useState<ListRecordingsResponse>();

  useEffect(() => {
    async function getRecording() {
      if (!client) {
        return;
      }

      try {
        setLoading(true);
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id: cid,
          },
        });

        const recordings = await calls[0].queryRecordings();

        setRecordings(recordings);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    }

    getRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-secondary p-5">
      {recordings?.recordings.map((recording) => (
        <Link key={recording.filename} href={recording.url} target="_blank">
          <span className="text-primary hover:underline">Xem lại record</span>
        </Link>
      ))}
    </div>
  );
};
export default Recording;
