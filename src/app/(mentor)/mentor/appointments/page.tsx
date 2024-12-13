import MeetingList from "@/app/(mentor)/mentor/appointments/components/meeting-list";
import { Separator } from "@/components/ui/separator";

const appointmentsPage = () => {
  return (
    <section>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Lịch hẹn</h1>
      </div>

      <Separator className="my-5" />

      <MeetingList />
    </section>
  );
};
export default appointmentsPage;
