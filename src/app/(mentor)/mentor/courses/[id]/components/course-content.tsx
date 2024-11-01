"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import courseApi from "@/apis/course.api";
import SectionModal from "@/app/(mentor)/mentor/courses/[id]/components/section-modal";
import AlertDialog from "@/components/alert-dialog";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  CourseDetailType,
  SectionRequestType,
  SectionType,
  UpdateCourseSectionRequestType,
  updateCourseSectionRequest,
} from "@/schemas";

export type EditSectionType = {
  section: SectionType | SectionRequestType | undefined;
  index: number | undefined;
};

const CourseContent = ({
  course,
  isEdit,
  setIsEdit,
}: {
  course: CourseDetailType;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const [sections, setSections] = useState<
    SectionType[] | SectionRequestType[]
  >(course.sections);

  const [deleteSectionIndex, setDeleteSectionIndex] = useState<
    number | undefined
  >();

  const [editSection, setEditSection] = useState<EditSectionType>();

  const form = useForm<UpdateCourseSectionRequestType>({
    resolver: zodResolver(updateCourseSectionRequest),
    defaultValues: {
      upsertSections: course.sections.map((section) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        duration: section.duration,
        isPublic: section.isPublic,
        files: section.files.map((file) => ({
          fileId: file.fileId,
        })),
      })),
      removeSectionIds: [],
    },
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "upsertSections",
  });

  const handleCancelDelete = () => {
    setDeleteSectionIndex(undefined);
    setIsOpenAlert(false);
  };

  const handleRemoveSection = (index: number) => {
    setIsEdit(true);
    remove(index);

    if (sections[index].id) {
      form.setValue(
        "removeSectionIds",
        form.getValues("removeSectionIds").concat(sections[index].id)
      );
    }

    console.log("form after remove", form.getValues());

    setSections((prev) => prev.filter((_, i) => i !== index));

    setDeleteSectionIndex(undefined);

    toast({
      title: "Success",
      description: "The section has been successfully deleted",
    });
  };

  const handleAddSection = (newSection: SectionRequestType) => {
    setIsEdit(true);
    append(newSection);

    console.log("form after append", form.getValues());

    setSections((prev) => [...prev, newSection]);

    setEditSection(undefined);

    setIsOpenModal(false);

    toast({
      title: "Success",
      description: "The section has been successfully added",
    });
  };

  const handleEditSection = (index: number, newSection: SectionRequestType) => {
    setIsEdit(true);
    const updatedSections = sections.map((section, index) =>
      index === editSection?.index ? newSection : section
    );

    form.setValue("upsertSections", updatedSections);

    console.log("form after edit", form.getValues());

    setSections(updatedSections);

    setEditSection(undefined);

    setIsOpenModal(false);

    toast({
      title: "Success",
      description: "The section has been successfully updated",
    });
  };

  const handleSave = async () => {
    console.log("form", form.getValues());

    try {
      setIsLoading(true);

      await courseApi.updateCourseSections(course.id, form.getValues());

      toast({
        title: "Success",
        description: "The course curriculum has been successfully updated",
      });
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);

      setIsEdit(false);
    }
  };

  return (
    <>
      <div className="flex-between">
        <h2 className="text-xl text-secondary-foreground">Course Curriculum</h2>

        <Button
          className="flex-center gap-2"
          onClick={handleSave}
          disabled={isLoading || !isEdit}
        >
          {isLoading ? <Loader /> : "Save"}
        </Button>
      </div>

      <Separator className="my-5" />

      <div className="space-y-5">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex justify-between overflow-hidden rounded-xl border border-primary"
          >
            <div className="space-y-2 p-5">
              <h3 className="flex items-center gap-2 font-semibold text-secondary-foreground">
                <span className="w-full flex-1">
                  Section {index + 1}: {section.title}
                </span>
              </h3>
              <p className="text-sm text-black">
                {section.description || "No description"}
              </p>
              <p className="text-sm">
                Duration: {section.duration || 0}h -{" "}
                {section.isPublic ? "Public" : "Private"}
              </p>
            </div>

            <div className="flex flex-col items-center justify-evenly bg-secondary px-2">
              <div
                className="p-2 hover:text-primary"
                onClick={() => {
                  setEditSection({ section, index });
                  setIsOpenModal(true);
                }}
              >
                <PencilIcon size={16} />
              </div>

              <div
                className="p-2 hover:text-destructive"
                onClick={() => {
                  setIsOpenAlert(true);
                  setDeleteSectionIndex(index);
                }}
              >
                <TrashIcon size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="flex-center mt-5 gap-2"
        onClick={() => setIsOpenModal(true)}
      >
        <PlusIcon size={16} />
        Add Section
      </Button>

      {/* Modal for adding and editing section */}
      <SectionModal
        isOpen={isOpenModal}
        title={editSection ? "Edit Section" : "Add Section"}
        description={editSection ? "Edit your section" : "Add your section"}
        handleCancel={() => {
          setEditSection(undefined);
          setIsOpenModal(false);
        }}
        handleAddSection={handleAddSection}
        handleEditSection={handleEditSection}
        editSection={editSection}
      />

      {/* Alert dialog when delete section */}
      <AlertDialog
        open={isOpenAlert}
        onOpenChange={handleCancelDelete}
        onCancel={handleCancelDelete}
        onConfirm={() => {
          setIsOpenAlert(false);
          if (deleteSectionIndex !== undefined) {
            handleRemoveSection(deleteSectionIndex);
          }
        }}
      >
        <DialogTitle>Are you sure you want to delete this section?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete this
          section.
        </DialogDescription>
      </AlertDialog>
    </>
  );
};
export default CourseContent;
