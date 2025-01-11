import Reports from "@/app/(admin)/admin/reports/components/reports";
import { Separator } from "@/components/ui/separator";

const ReportPage = () => {
  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">
          Danh sách báo cáo
        </h1>
      </div>

      <Separator className="my-5" />

      <Reports />
    </main>
  );
};
export default ReportPage;
