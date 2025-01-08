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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { REPORT_TYPE } from "@/constants/enum";
import { ReportRequestType } from "@/schemas/report.schema";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

interface IProps {
  openReport: boolean;
  setOpenReport: Dispatch<SetStateAction<boolean>>;
  reportForm: UseFormReturn<ReportRequestType>;
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
          <DialogTitle className="text-primary">Báo cáo</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...reportForm}>
          <form
            onSubmit={reportForm.handleSubmit(handleReport)}
            className="space-y-4"
          >
            <FormField
              control={reportForm.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại báo cáo</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại báo cáo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={REPORT_TYPE.COURSE_UNQUALIFIED}>
                        Khóa học không đạt chất lượng
                      </SelectItem>
                      <SelectItem value={REPORT_TYPE.MENTOR_ISSUES}>
                        Vấn đề với mentor
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

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
