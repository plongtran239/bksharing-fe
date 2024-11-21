import http from "@/lib/http";
import { DetailResponseType } from "@/schemas";
import {
  MakePaymentRequestType,
  VerifyPaymentRequestType,
} from "@/schemas/payment.schema";

const paymentApi = {
  makePayment: (body: MakePaymentRequestType) =>
    http.post<DetailResponseType<string>>("/client/payments", body),

  verifyPayment: (body: VerifyPaymentRequestType) =>
    http.post("/client/payments/verify", body),
};

export default paymentApi;
