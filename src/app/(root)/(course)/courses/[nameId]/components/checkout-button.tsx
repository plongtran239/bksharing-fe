"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import paymentApi from "@/apis/payment.api";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";

interface IProps {
  courseId: number;
  amount: number;
}

const CheckoutButton = ({ courseId, amount }: IProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMakePayment = async () => {
    try {
      setLoading(true);

      const {
        payload: { data: paymentUrl },
      } = await paymentApi.makePayment({
        courseId,
        amount,
        description: `Enroll to course ${courseId}`,
      });

      router.push(paymentUrl);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className="w-full" onClick={handleMakePayment} disabled={loading}>
      {loading ? <Loader /> : "Enroll"}
    </Button>
  );
};
export default CheckoutButton;
