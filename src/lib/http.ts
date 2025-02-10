/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/config";
import { EntityError, EntityErrorPayload } from "@/lib/exceptions";
import { normalizePath } from "@/lib/utils";
import { AuthResponseType, VerifyResponseType } from "@/schemas";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

export const isClient = () => typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  if (isClient()) {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
      baseHeaders.Authorization = `Bearer ${sessionToken}`;
    }
  }

  // If baseUrl is not passed (or passed undefined) then get from envConfig.NEXT_PUBLIC_API_ENDPOINT
  // If baseUrl is passed then get from baseUrl, pass "" is equivalent to calling the API to the Next.js server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    throw new EntityError(
      data as {
        status: number;
        payload: EntityErrorPayload;
      }
    );
  }

  if (isClient()) {
    if (["auth/login"].some((item) => item === normalizePath(url))) {
      const { accessToken } = (payload as AuthResponseType).data;
      localStorage.setItem("sessionToken", accessToken);
    }

    if (normalizePath(url).startsWith("auth/verification")) {
      const { token } = (payload as VerifyResponseType).data;

      localStorage.setItem("sessionToken", token);
    }
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },

  post<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },

  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },

  patch<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },

  delete<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
