import { z } from "zod";

const MakePaymentRequest = z.object({
  courseId: z.number(),
  amount: z.number(),
  description: z.string().optional(),
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
});

type MakePaymentRequestType = z.infer<typeof MakePaymentRequest>;
type VerifyPaymentRequestType = z.infer<typeof VerifyPaymentRequest>;

export { MakePaymentRequest, VerifyPaymentRequest };

export type { MakePaymentRequestType, VerifyPaymentRequestType };
