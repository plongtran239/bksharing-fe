import CallTimeline from "@/app/(admin)/admin/reports/[id]/call/components/call-timeline";
import Recording from "@/app/(admin)/admin/reports/[id]/call/components/recording";
import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";

const CallPage = ({
  searchParams: { callId, cid },
  params: { id },
}: {
  searchParams: {
    callId: number;
    cid: string;
  };
  params: {
    id: number;
  };
}) => {
  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Chi tiết cuộc gọi
        </h1>

        <BackButton />
      </div>

      <Separator className="my-5" />

      <div className="flex gap-10">
        <div className="">
          <CallTimeline callId={callId} />
        </div>
        <div className="w-full flex-1">
          <Recording cid={cid} reportId={id} />
        </div>
      </div>
    </main>
  );
};
export default CallPage;
