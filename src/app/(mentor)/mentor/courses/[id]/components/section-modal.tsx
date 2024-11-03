import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { EditSectionType } from "@/app/(mentor)/mentor/courses/[id]/components/course-content";
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
import { SectionRequest, SectionRequestType } from "@/schemas";

const SectionModal = ({
  isOpen,
  title,
  description,
  handleCancel,
  handleAddSection,
  handleEditSection,
  editSection,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  handleCancel: () => void;
  handleAddSection: (newSection: SectionRequestType) => void;
  handleEditSection: (newSection: SectionRequestType) => void;
  editSection?: EditSectionType;
}) => {
  const form = useForm<SectionRequestType>({
    resolver: zodResolver(SectionRequest),
    defaultValues: {
      title: "",
      description: "",
      duration: undefined,
      isPublic: false,
      files: [],
    },
  });

  useEffect(() => {
    if (editSection) {
      form.reset(editSection.section);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSection]);

  const onSubmit = (data: SectionRequestType) => {
    if (editSection?.index !== undefined) {
      handleEditSection(data);
    } else {
      handleAddSection(data);
    }

    form.reset({
      title: "",
      description: "",
      duration: 0,
      isPublic: false,
      files: [],
    });
  };

  const cancel = () => {
    form.reset({
      title: "",
      description: "",
      duration: 0,
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

              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="duration..."
                          value={field.value || ""}
                          onChange={(e) => {
                            field.onChange({
                              target: { value: Number(e.target.value) || "" },
                            });
                          }}
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
              </div>
            </form>
          </Form>

          <DialogFooter>
            <Button variant="outline" onClick={cancel}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isDirty}
            >
              {editSection ? "Edit" : "Add"} Section
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default SectionModal;
