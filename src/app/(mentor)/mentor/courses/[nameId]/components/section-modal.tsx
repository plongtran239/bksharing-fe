import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import courseApi from "@/apis/course.api";
import Loader from "@/components/loader";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SectionRequest, SectionRequestType, SectionType } from "@/schemas";

const SectionModal = ({
  courseId,
  isOpen,
  title,
  description,
  handleCancel,
  editSection,
}: {
  courseId: number;
  isOpen: boolean;
  title: string;
  description: string;
  handleCancel: () => void;
  editSection?: SectionType;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SectionRequestType>({
    resolver: zodResolver(SectionRequest),
    defaultValues: {
      id: undefined,
      title: "",
      description: "",
      isPublic: false,
      files: [],
    },
  });

  useEffect(() => {
    if (editSection) {
      form.reset({
        id: editSection.id,
        title: editSection.title,
        description: editSection.description,
        isPublic: editSection.isPublic,
        files: editSection.files.map((file) => ({
          fileId: file.fileId,
          isPublic: file.isPublic,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSection]);

  const onSubmit = async (data: SectionRequestType) => {
    try {
      setIsLoading(true);

      if (editSection) {
        await courseApi.updateCourseSections(courseId, editSection.id, data);
      } else {
        await courseApi.addCourseSection(courseId, data);
      }

      toast({
        title: "Success",
        description: "The section has been successfully added",
      });

      cancel();

      router.refresh();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = () => {
    form.reset({
      id: undefined,
      title: "",
      description: "",
      isPublic: false,
      files: [],
    });
    handleCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={cancel} modal>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1 text-primary">
            {title}
          </DialogTitle>

          <DialogDescription>{description}</DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 pb-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input id="title" placeholder="title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="desc"
                        placeholder="description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value ? "Public" : "Private"}
                        onValueChange={(value) =>
                          field.onChange(value === "Public")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="select visibility"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button variant="outline" onClick={cancel}>
                  Cancel
                </Button>
                <Button
                  onClick={() => onSubmit(form.getValues())}
                  disabled={!form.formState.isDirty || isLoading}
                >
                  {isLoading ? <Loader /> : editSection ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default SectionModal;
