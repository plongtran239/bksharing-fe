"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import reportApi from "@/apis/report.api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { REPORT_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";

const Resolution = ({ reportId }: { reportId: number }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isAccept, setIsAccept] = useState(false);
  const [resolution, setResolution] = useState("");

  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await reportApi.resolveSubscriptionReport(reportId, {
        resolution,
        status: isAccept ? REPORT_STATUS.RESOLVED : REPORT_STATUS.REJECTED,
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
          setIsAccept(false);
        }}
      >
        <DialogContent>
          <DialogHeader className="text-xl font-semibold text-primary">
            <DialogTitle>Xử lý báo cáo</DialogTitle>
            <DialogDescription>
              Bạn đang xử lý báo cáo #{reportId}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={isAccept}
              id="checkbox"
              onCheckedChange={() => setIsAccept(!isAccept)}
            />
            <Label htmlFor="checkbox">Chấp nhận</Label>
          </div>

          <Label>Nhập hướng giải quyết</Label>
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
                setIsAccept(false);
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
