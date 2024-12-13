import subscriptionApi from "@/apis/subscription.api";
import RequestTable from "@/app/(mentor)/mentor/requests/components/request-table";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const RequestPage = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await subscriptionApi.getSubscriptions(sessionToken);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Danh sách yêu cầu đăng ký khóa học
        </h1>
      </div>

      <Separator className="my-5" />

      <RequestTable data={data} />
    </main>
  );
};
export default RequestPage;
