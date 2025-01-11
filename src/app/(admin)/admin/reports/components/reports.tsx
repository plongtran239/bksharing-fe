import reportApi from "@/apis/report.api";
import ReportTable from "@/app/(admin)/admin/reports/components/report-table";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const Reports = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await reportApi.getReports(sessionToken);

  return <ReportTable data={data} />;
};
export default Reports;
