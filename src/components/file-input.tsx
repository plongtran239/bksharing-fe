import { CloudUploadIcon, Paperclip, TrashIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface IFileInputProps {
  id?: string;
  accept: string;
  value: string | undefined;
  classname?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FileInput = ({
  id,
  accept,
  value,
  onChange,
  classname,
}: IFileInputProps) => {
  const handleUploadFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const input = document.getElementById(id as string) as HTMLInputElement;
    input.click();
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    onChange({
      target: {
        value: "",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const getFileName = (filePath: string) => {
    const parts = filePath.split("\\");
    return parts[parts.length - 1]; // Get the last part of the array
  };

  return (
    <div className={cn(classname)}>
      {value ? (
        <div className="flex-between group rounded-lg p-2 transition hover:bg-primary/30">
          <div className="flex-center gap-2">
            <Paperclip size={16} />

            <p>{getFileName(value)}</p>
          </div>

          <button
            onClick={handleRemoveFile}
            className="opacity-0 transition hover:text-destructive group-hover:opacity-100"
          >
            <TrashIcon size={16} />
          </button>
        </div>
      ) : (
        <div className="flex-center">
          <Button
            variant="secondary"
            onClick={handleUploadFile}
            className="flex-center gap-2"
          >
            <CloudUploadIcon size={16} />
            <span>Upload File</span>
          </Button>

          <Input
            id={id}
            accept={accept}
            type="file"
            value={value}
            onChange={onChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default FileInput;
