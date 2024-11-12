import { PaperclipIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import courseApi from "@/apis/course.api";
import fileApi from "@/apis/file.api";
import AlertDialog from "@/components/alert-dialog";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FOLDER, RESOURCE_TYPE } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { SectionFileType } from "@/schemas";

interface IProps {
  files: SectionFileType[] | undefined;
  accept: string;
  courseId: number;
  sectionId: number;
  className?: string;
}

const InputFiles = ({
  files: initialFiles,
  accept,
  courseId,
  sectionId,
  className,
}: IProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [deleteFileId, setDeleteFileId] = useState<number | undefined>(
    undefined
  );
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    try {
      setIsLoading(true);

      // Create signed url
      const result = await Promise.all(
        Array.from(files).map((file) =>
          fileApi.createSignedUrl({
            fileName: file.name,
            resourceType: RESOURCE_TYPE.RAW.toLowerCase(),
            folder: FOLDER.FILES.toLowerCase(),
          })
        )
      );

      const uploadFiles = result.map(({ payload: { data } }) => ({
        fileId: data.fileId,
        url: data.uploadedUrl,
      }));

      // Upload file to signed url
      await Promise.all(
        uploadFiles.map(({ url }, index) =>
          fileApi.uploadFile(url, files.item(index) as File)
        )
      );

      // Update course section with files
      await courseApi.updateCourseSections(courseId, sectionId, {
        files: [
          ...(initialFiles || []),
          ...uploadFiles.map(({ fileId }) => ({
            fileId: fileId,
            isPublic: false,
          })),
        ],
      });

      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });

      router.refresh();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = async (fileId: number) => {
    try {
      setIsLoading(true);

      await courseApi.updateCourseSections(courseId, sectionId, {
        files: (initialFiles || []).filter((file) => file.fileId !== fileId),
      });

      toast({
        title: "Success",
        description: "File deleted successfully!",
      });

      setIsOpenDialog(false);

      router.refresh();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn(className)}>
        {initialFiles && initialFiles.length > 0 && (
          <>
            <div className="my-1 space-y-1">
              {initialFiles.map((file, index) => {
                return (
                  <div
                    key={index}
                    className="flex-between rounded-lg bg-secondary p-2"
                  >
                    <Link
                      href={file.url || "#"}
                      className="max-w-2/3 flex items-center gap-2 text-sm"
                      target="_blank"
                    >
                      <PaperclipIcon size={16} />
                      <span className="line-clamp-1 flex-1">{file.url}</span>
                      <span>({(file.fileSize / 1000).toFixed(1)} kB)</span>
                    </Link>
                    <button
                      className="hover:text-destructive"
                      onClick={() => {
                        setIsOpenDialog(true);
                        setDeleteFileId(file.fileId);
                      }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <Separator className="my-5" />

        <Button
          variant="outline"
          className="flex-center gap-2 px-3 text-primary"
          onClick={() => {
            const input = document.getElementById(
              `input${sectionId}`
            ) as HTMLInputElement;
            input.click();
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <PlusIcon size={16} />
              Resources
            </>
          )}
        </Button>

        <Input
          id={`input${sectionId}`}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleUploadFile}
        />
      </div>

      <AlertDialog
        open={isOpenDialog}
        onOpenChange={() => setIsOpenDialog(!isOpenDialog)}
        onCancel={() => {
          setIsOpenDialog(false);
          setDeleteFileId(undefined);
        }}
        onConfirm={() => {
          if (!deleteFileId) {
            return;
          }
          handleRemoveFile(deleteFileId);
        }}
        isLoading={isLoading}
        title="Are you sure you want to delete this file?"
        description="This action cannot be undone. This will permanently delete this file."
      />
    </>
  );
};
export default InputFiles;
