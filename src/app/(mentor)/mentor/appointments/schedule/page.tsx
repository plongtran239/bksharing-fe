import ScheduleApi from "@/apis/schedule.api";
import Scheduling from "@/app/(mentor)/mentor/appointments/schedule/components/scheduling";
import ScheduleTable from "@/components/schedule-table";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { ScheduleType } from "@/schemas/schedule.schema";

const ScheduleAppointmentPage = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  let schedules: ScheduleType[] = [];

  try {
    const {
      payload: { data },
    } = await ScheduleApi.getSchedules(sessionToken);

    schedules = data;
  } catch (error) {
    console.error({ error });
  }

  return (
    <section>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Schedule</h1>
      </div>

      <Separator className="my-5" />

      <div className="grid grid-cols-4 gap-10">
        <div className="col-span-3">
          <ScheduleTable schedules={schedules} />
        </div>

        <div className="col-span-1">
          <Scheduling />
        </div>
      </div>
    </section>
  );
};
export default ScheduleAppointmentPage;
