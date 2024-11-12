"use client";

import {
  ChevronsUpDownIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import courseApi from "@/apis/course.api";
import InputFiles from "@/app/(mentor)/mentor/courses/[nameId]/components/input-files";
import SectionModal from "@/app/(mentor)/mentor/courses/[nameId]/components/section-modal";
import AlertDialog from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CourseDetailType, SectionType } from "@/schemas";

const CourseContent = ({
  course,
}: {
  course: CourseDetailType;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const [deleteSectionId, setDeleteSectionId] = useState<number | undefined>();

  const [editSection, setEditSection] = useState<SectionType>();

  const handleOpenChangeAlertDialog = () => {
    setIsOpenAlert(!isOpenAlert);
  };

  const handleCancelAlertDialog = () => {
    setIsOpenAlert(false);
    setDeleteSectionId(undefined);
  };

  const handleDeleteSection = async () => {
    if (!deleteSectionId) return;

    try {
      setIsLoading(true);

      await courseApi.deleteCourseSection(course.id, deleteSectionId);

      toast({
        title: "Success",
        description: "Section deleted successfully",
      });

      router.refresh();

      setIsOpenAlert(false);
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-between">
        <h2 className="text-xl font-semibold text-secondary-foreground">
          Curriculum
        </h2>
      </div>

      <Separator className="my-5" />

      <div className="space-y-5">
        {course.sections.map((section, index) => (
          <Collapsible key={section.id} defaultOpen>
            {/* Section Title, Duration & Visibility */}
            <CollapsibleTrigger className="group flex w-full justify-between overflow-hidden rounded-t-xl border border-primary bg-secondary text-left">
              <div className="w-full space-y-2 p-5">
                <h3 className="flex items-center gap-2 font-semibold text-secondary-foreground">
                  <span className="line-clamp-1">
                    Section {index + 1}: {section.title}
                  </span>
                  <ChevronsUpDownIcon
                    size={16}
                    className="hidden group-hover:block"
                  />
                </h3>
                <p className="text-sm">
                  Duration: {section.duration || 0}h -{" "}
                  {section.isPublic ? "Public" : "Private"}
                </p>
              </div>

              <div className="hidden h-full rounded-bl-xl border-b border-l border-primary bg-white px-2 group-hover:flex">
                <div
                  className="h-full p-2 hover:text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditSection(section);
                    setIsOpenModal(true);
                  }}
                >
                  <PencilIcon size={16} />
                </div>

                <div
                  className="h-full p-2 hover:text-destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpenAlert(true);
                    setDeleteSectionId(section.id);
                  }}
                >
                  <TrashIcon size={16} />
                </div>
              </div>
            </CollapsibleTrigger>

            {/* Description & Files */}
            <CollapsibleContent className="space-y-5 rounded-b-xl border border-primary border-t-transparent p-5">
              <p className="text-sm text-black">
                {section.description !== ""
                  ? section.description
                      .trim()
                      .split("\n")
                      .map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))
                  : "No description"}
              </p>

              <Separator className="my-5" />

              <InputFiles
                files={section.files || undefined}
                courseId={course.id}
                sectionId={section.id}
                accept=".png, .jpg, .jpeg, .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .zip, .rar"
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {/* Add Section Button */}
      <Button
        className="flex-center mt-5 gap-2"
        onClick={() => setIsOpenModal(true)}
      >
        <PlusIcon size={16} />
        Add Section
      </Button>

      {/* Modal for adding and editing section */}
      <SectionModal
        courseId={course.id}
        isOpen={isOpenModal}
        title={editSection ? "Edit Section" : "Add Section"}
        description={editSection ? "Edit your section" : "Add your section"}
        handleCancel={() => {
          setEditSection(undefined);
          setIsOpenModal(false);
        }}
        editSection={editSection}
      />

      {/* Alert dialog when delete section */}
      <AlertDialog
        open={isOpenAlert}
        onOpenChange={handleOpenChangeAlertDialog}
        onCancel={handleCancelAlertDialog}
        onConfirm={handleDeleteSection}
        isLoading={isLoading}
        title="Are you sure you want to delete this section?"
        description="This action cannot be undone. This will permanently delete this section."
      />
    </>
  );
};
export default CourseContent;
