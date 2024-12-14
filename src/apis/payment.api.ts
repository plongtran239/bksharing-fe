import http from "@/lib/http";
import { DetailResponseType } from "@/schemas";
import {
  MakePaymentRequestType,
  MakePaymentResponseType,
  VerifyPaymentRequestType,
} from "@/schemas/payment.schema";

const paymentApi = {
  makePayment: (body: MakePaymentRequestType) =>
    http.post<DetailResponseType<MakePaymentResponseType>>(
      "/client/payments",
      body
    ),

  verifyPayment: (body: VerifyPaymentRequestType) =>
    http.post("/client/payments/verify", body),
};

export default paymentApi;
