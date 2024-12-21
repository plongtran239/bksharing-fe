import http from "@/lib/http";
import { DetailResponseType } from "@/schemas";
import { VerifyPaymentRequestType } from "@/schemas/payment.schema";

const paymentApi = {
  verifyPayment: (body: VerifyPaymentRequestType) =>
    http.post<
      DetailResponseType<{
        data: {
          message: string;
          vnp_TransactionStatus: string;
        };
      }>
    >("/client/payments/verify", body),
};

export default paymentApi;
