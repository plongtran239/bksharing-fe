import ScheduleTable from "@/app/(mentor)/mentor/appointments/schedule/components/schedule-table";
import Scheduling from "@/app/(mentor)/mentor/appointments/schedule/components/scheduling";
import { Separator } from "@/components/ui/separator";

const ScheduleAppointmentPage = () => {
  return (
    <section>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Schedule</h1>
      </div>

      <Separator className="my-5" />

      <div className="grid grid-cols-4 gap-10">
        <div className="col-span-3">
          <ScheduleTable />
        </div>

        <div className="col-span-1">
          <Scheduling />
        </div>
      </div>
    </section>
  );
};
export default ScheduleAppointmentPage;
