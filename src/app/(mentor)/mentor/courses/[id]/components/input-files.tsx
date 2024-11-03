import { PaperclipIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SectionFileType } from "@/schemas";

interface IProps {
  files: SectionFileType[] | undefined;
  accept: string;
  className?: string;
}

const InputFiles = ({ files: initialFiles, accept, className }: IProps) => {
  const [files, setFiles] = useState<File[] | undefined>(
    initialFiles?.map((file) => new File([], file.name))
  );

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
      >
        <PlusIcon size={16} />
        Resources
      </Button>

      <Input
        id="input"
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setFiles((prevFiles) => [
              ...(prevFiles || []),
              ...Array.from(files),
            ]);
          }
        }}
      />
    </div>
  );
};
export default InputFiles;
