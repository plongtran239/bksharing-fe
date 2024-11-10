import { PaperclipIcon, PlusIcon, TrashIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

import courseApi from "@/apis/course.api";
import fileApi from "@/apis/file.api";
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
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>(
    initialFiles?.map((file) => new File([], file.name))
  );

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
        files: uploadFiles.map(({ fileId }) => ({
          fileId: fileId,
          isPublic: false,
        })),
      });

      setFiles((prevFiles) => [...(prevFiles || []), ...Array.from(files)]);

      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => {
      if (prevFiles) {
        const newFiles = [...prevFiles];
        newFiles.splice(index, 1);
        return newFiles;
      }
      return prevFiles;
    });
  };

  return (
    <div className={cn(className)}>
      {files && files.length > 0 && (
        <>
          <div className="my-1 space-y-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex-between rounded-lg bg-secondary p-2"
              >
                <div className="flex-center gap-2">
                  <PaperclipIcon size={16} />
                  <span>{file.name}</span>
                  <span>({(file.size / 1000).toFixed(1)} kB)</span>
                </div>
                <button
                  className="hover:text-destructive"
                  onClick={() => handleRemoveFile(index)}
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            ))}
          </div>

          <Separator className="my-5" />
        </>
      )}

      <Button
        variant="outline"
        className="flex-center gap-2 px-3 text-primary"
        onClick={() => {
          const input = document.getElementById("input") as HTMLInputElement;
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
        id="input"
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={handleUploadFile}
      />
    </div>
  );
};
export default InputFiles;
