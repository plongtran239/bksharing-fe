import ScheduleApi from "@/apis/schedule.api";
import ClientSchedule from "@/app/(mentor)/mentor/schedule/components/client-schedule";
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
        <h1 className="text-3xl font-semibold text-primary">Xếp thời gian</h1>
      </div>

      <Separator className="my-5" />

      <ClientSchedule schedules={schedules} />
    </section>
  );
};
export default ScheduleAppointmentPage;
