import { z } from "zod";

const DetailResponse = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    data: dataSchema,
    message: z.string(),
  });

const ListResponse = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    data: z.array(dataSchema),
    total: z.number(),
  });

type DetailResponseType<T> = z.infer<ReturnType<typeof DetailResponse<T>>>;

type ListResponseType<T> = z.infer<ReturnType<typeof ListResponse<T>>>;

export { DetailResponse, ListResponse };

export type { DetailResponseType, ListResponseType };
