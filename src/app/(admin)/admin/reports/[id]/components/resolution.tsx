"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import reportApi from "@/apis/report.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { REPORT_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";

const Resolution = ({ reportId }: { reportId: number }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [resolution, setResolution] = useState("");

  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await reportApi.resolveSubscriptionReport(reportId, {
        resolution,
        status: REPORT_STATUS.RESOLVED,
      });

      toast({
        title: "Thành công",
        description: "Báo cáo đã được giải quyết",
      });

      router.refresh();

      setOpen(false);
      setResolution("");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Giải quyết</Button>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(!open);
          setResolution("");
        }}
      >
        <DialogContent>
          <DialogHeader className="text-xl font-semibold text-primary">
            Xử lý báo cáo
          </DialogHeader>
          <DialogDescription>Nhập hướng giải quyết báo cáo</DialogDescription>

          <Textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="Nhập hướng giải quyết"
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setResolution("");
              }}
            >
              Hủy
            </Button>
            <Button onClick={handleSubmit}>Hoàn tất</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Resolution;
