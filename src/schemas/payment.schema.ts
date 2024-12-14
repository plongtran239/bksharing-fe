import { z } from "zod";

import { PAYMENT_STATUS } from "@/constants/enum";

const MakePaymentRequest = z.object({
  courseId: z.number(),
  subscriptionId: z.number(),
  amount: z.number(),
  description: z.string().optional(),
});

const MakePaymentResponse = z.object({
  payment: z.object({
    id: z.number(),
    status: z.nativeEnum(PAYMENT_STATUS),
  }),
  url: z.string(),
});

const VerifyPaymentRequest = z.object({
  vnp_Amount: z.number(),
  vnp_BankCode: z.string(),
  vnp_BankTranNo: z.string(),
  vnp_CardType: z.string(),
  vnp_OrderInfo: z.string(),
  vnp_PayDate: z.number(),
  vnp_ResponseCode: z.string(),
  vnp_TmnCode: z.string(),
  vnp_TransactionNo: z.string(),
  vnp_TransactionStatus: z.string(),
  vnp_TxnRef: z.string(),
  vnp_SecureHash: z.string(),
  paymentId: z.number(),
});

type MakePaymentRequestType = z.infer<typeof MakePaymentRequest>;
type MakePaymentResponseType = z.infer<typeof MakePaymentResponse>;
type VerifyPaymentRequestType = z.infer<typeof VerifyPaymentRequest>;

export { MakePaymentRequest, VerifyPaymentRequest };

export type {
  MakePaymentRequestType,
  MakePaymentResponseType,
  VerifyPaymentRequestType,
};
