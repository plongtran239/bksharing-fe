import reportApi from "@/apis/report.api";
import BackButton from "@/app/(admin)/admin/reports/[typeId]/components/back-button";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { getIdFromNameId } from "@/lib/utils";

const DetailReportPage = async ({
  params: { typeId },
}: {
  params: { typeId: string };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const reportId = getIdFromNameId(typeId);

  const {
    payload: { data },
  } = await reportApi.getDetailReport(reportId, sessionToken);

  if (!data) {
    return <div>Report not found</div>;
  }

  if (!data.subscription) {
    return <div>Subscription not found</div>;
  }

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Chi tiết báo cáo
        </h1>

        <BackButton />
      </div>

      <Separator className="my-5" />

      <div className="rounded-lg border bg-gray-50 p-4 shadow">
        <h2 className="text-xl font-semibold">Report Information</h2>
        <div className="mt-2 space-y-2">
          <p>
            <span className="font-semibold">Type:</span> {data.type}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {data.description}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {data.status}
          </p>
          <p>
            <span className="font-semibold">Resolution:</span>{" "}
            {data.resolution || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Created At:</span> {data.createdAt}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 rounded-lg bg-transparent md:flex-row">
        {/* Left Column */}
        <div className="flex-1 rounded-lg border bg-gray-50 p-4">
          <h2 className="mb-4 text-lg font-semibold">
            Information of Subscription
          </h2>
          <div>
            <p className="mb-2">
              <span className="font-semibold">Course:</span>{" "}
              {data.subscription.course.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {data.subscription.course.description}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {data.subscription.status}
            </p>

            <p className="mb-2">
              <span className="font-semibold">Payment Status:</span>{" "}
              {data.subscription.payment.status} (
              {data.subscription.payment.price} VND)
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border bg-gray-50 p-4">
            <h3 className="text-md font-semibold">Info of Student</h3>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {data.subscription.student.name}
            </p>
          </div>
          <div className="rounded-lg border bg-gray-50 p-4">
            <h3 className="text-md font-semibold">Info of Mentor</h3>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {data.subscription.mentor.name}
            </p>
          </div>
          <div className="rounded-lg border bg-gray-50 p-4">
            <h3 className="text-md font-semibold">Info of Audio Call</h3>
            <p>
              <span className="font-semibold">Call ID:</span>{" "}
              {data.subscription.audioCall.cid}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default DetailReportPage;
