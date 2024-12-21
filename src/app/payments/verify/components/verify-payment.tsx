"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import paymentApi from "@/apis/payment.api";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/app.provider";
import { VerifyPaymentRequestType } from "@/schemas/payment.schema";

const VerifyPayment = () => {
  const params = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const { paymentId } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [verifyPaymentRequest, setVerifyPaymentRequest] =
    useState<VerifyPaymentRequestType | null>(null);
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const vnp_Amount = params.get("vnp_Amount");
    const vnp_BankCode = params.get("vnp_BankCode");
    const vnp_BankTranNo = params.get("vnp_BankTranNo");
    const vnp_CardType = params.get("vnp_CardType");
    const vnp_OrderInfo = params.get("vnp_OrderInfo");
    const vnp_PayDate = params.get("vnp_PayDate");
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    const vnp_TmnCode = params.get("vnp_TmnCode");
    const vnp_TransactionNo = params.get("vnp_TransactionNo");
    const vnp_TransactionStatus = params.get("vnp_TransactionStatus");
    const vnp_TxnRef = params.get("vnp_TxnRef");
    const vnp_SecureHash = params.get("vnp_SecureHash");

    if (paymentId) {
      setVerifyPaymentRequest({
        vnp_Amount: vnp_Amount ? parseInt(vnp_Amount) : 0,
        vnp_BankCode: vnp_BankCode || "",
        vnp_BankTranNo: vnp_BankTranNo || "",
        vnp_CardType: vnp_CardType || "",
        vnp_OrderInfo: vnp_OrderInfo || "",
        vnp_PayDate: vnp_PayDate ? parseInt(vnp_PayDate) : 0,
        vnp_ResponseCode: vnp_ResponseCode || "",
        vnp_TmnCode: vnp_TmnCode || "",
        vnp_TransactionNo: vnp_TransactionNo || "",
        vnp_TransactionStatus: vnp_TransactionStatus || "",
        vnp_TxnRef: vnp_TxnRef || "",
        vnp_SecureHash: vnp_SecureHash || "",
        paymentId: paymentId,
      });
    }
  }, [params, paymentId]);

  useEffect(() => {
    async function verifyPaymentAPI() {
      try {
        if (verifyPaymentRequest) {
          const {
            payload: { data },
          } = await paymentApi.verifyPayment(verifyPaymentRequest);

          const isSuccess = data.data.vnp_TransactionStatus === "00";

          setIsSuccess(isSuccess);

          toast({
            title: isSuccess ? "Thành công" : "Thất bại",
            description: data.data.message,
            variant: isSuccess ? "default" : "destructive",
          });

          setLoading(false);
        }
      } catch (error) {
        console.error({ error });
      }
    }

    if (verifyPaymentRequest) {
      verifyPaymentAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyPaymentRequest]);

  useEffect(() => {
    if (countDown > 0) {
      const interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      router.push("/subscriptions");
    }
  }, [countDown, router]);

  if (loading) {
    return <Loader description="Đang xử lý thành toán..." />;
  }

  if (!loading && isSuccess) {
    return (
      <div className="flex-center flex-col gap-5">
        <h1 className="text-3xl font-bold text-green-400">
          Thanh toán thành công!
        </h1>
        <Button onClick={() => router.push("/subscriptions")}>
          Trở về sau {countDown} giây
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-center flex-col gap-5">
      <h1 className="text-3xl font-bold text-red-500">Thanh toán thất bại!</h1>
      <Button onClick={() => router.push("/subscriptions")}>
        Trở về sau {countDown} giây
      </Button>
    </div>
  );
};
export default VerifyPayment;
