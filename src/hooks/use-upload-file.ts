import { useState } from "react";

import fileApi from "@/apis/file.api";
import { useToast } from "@/hooks/use-toast";

export const useUploadFile = ({
  resourceType,
  folder,
}: {
  resourceType: string;
  folder: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { toast } = useToast();

  const uploadFile = async (file: File | undefined) => {
    if (!file) {
      toast({
        title: "Error",
        description: "No file selected",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const {
        payload: { data: createdSignedUrl },
      } = await fileApi.createSignedUrl({
        fileName: file.name,
        resourceType,
        folder,
      });

      await fileApi.uploadFile(createdSignedUrl.uploadedUrl, file);

      return createdSignedUrl;
    } catch (error) {
      console.error({ error });

      toast({
        title: "Error",
        description: "An error occurred during file upload",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, file, setFile, uploadFile };
};
