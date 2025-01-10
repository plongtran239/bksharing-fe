import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackReportRequestType } from "@/schemas/report.schema";

interface IProps {
  openReport: boolean;
  setOpenReport: Dispatch<SetStateAction<boolean>>;
  reportForm: UseFormReturn<FeedbackReportRequestType>;
  handleReport: () => void;
}

const ReportDialog = ({
  openReport,
  setOpenReport,
  reportForm,
  handleReport,
}: IProps) => {
  return (
    <Dialog open={openReport} onOpenChange={() => setOpenReport(!openReport)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Báo cáo đánh giá</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...reportForm}>
          <form
            onSubmit={reportForm.handleSubmit(handleReport)}
            className="space-y-4"
          >
            <FormField
              control={reportForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <Textarea {...field} placeholder="Nhập nội dung báo cáo..." />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            className="w-32"
            variant="outline"
            onClick={() => {
              setOpenReport(false);
              reportForm.reset();
            }}
          >
            Đóng
          </Button>
          <Button className="w-32" onClick={handleReport} variant="destructive">
            Báo cáo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ReportDialog;
