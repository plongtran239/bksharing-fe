import http from "@/lib/http";

const fileApi = {
  createSignedUrl: (body: {
    fileName: string;
    resourceType: string;
    folder: string;
  }) =>
    http.post<{
      data: {
        fileId: number;
        uploadedUrl: string;
      };
      message: string;
    }>("/files/signed-url", body),

  uploadFile: (url: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(url, {
      method: "POST",
      body: formData,
    });
  },
};

export default fileApi;
