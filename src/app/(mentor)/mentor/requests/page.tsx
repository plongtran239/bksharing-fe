import subcriptionApi from "@/apis/subscription.api";
import RequestTable from "@/app/(mentor)/mentor/requests/components/request-table";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const RequestPage = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const { payload } = await subcriptionApi.getSubscriptions(sessionToken);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Danh sách yêu cầu học
        </h1>
      </div>

      <Separator className="my-5" />

      <RequestTable data={payload} />
    </main>
  );
};
export default RequestPage;
