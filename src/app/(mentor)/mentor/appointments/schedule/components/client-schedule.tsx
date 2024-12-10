"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import ScheduleApi from "@/apis/schedule.api";
import Scheduling from "@/app/(mentor)/mentor/appointments/schedule/components/scheduling";
import AlertDialog from "@/components/alert-dialog";
import ScheduleTable from "@/components/schedule-table";
import { useToast } from "@/hooks/use-toast";
import { ScheduleType } from "@/schemas/schedule.schema";

const ClientSchedule = ({ schedules }: { schedules: ScheduleType[] }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [activeScheduleId, setActiveScheduleId] = useState<
    number | undefined
  >();

  const [open, setOpen] = useState(false);

  const handleDeleteSchedule = async () => {
    try {
      if (!activeScheduleId) return;

      await ScheduleApi.deleteSchedule(activeScheduleId);

      router.refresh();

      setOpen(false);

      toast({
        title: "Thành công",
        description: "Xóa lịch hẹn thành công",
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-10">
        <div className="col-span-3">
          <ScheduleTable
            schedules={schedules}
            handleOpenDialog={() => {
              setOpen(true);
            }}
            setActiveScheduleId={setActiveScheduleId}
          />
        </div>

        <div className="col-span-1">
          <Scheduling />
        </div>
      </div>

      <AlertDialog
        open={open}
        onOpenChange={() => setOpen(!open)}
        description="Các học viên có thể thấy lịch của bạn và đặt lịch hẹn với bạn vào thời gian này. Bạn có muốn xóa đi không?"
        title="Xóa lịch hẹn"
        onCancel={() => setOpen(false)}
        onConfirm={handleDeleteSchedule}
      />
    </>
  );
};
export default ClientSchedule;
