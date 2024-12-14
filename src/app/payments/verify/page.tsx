import { Metadata } from "next";
import Image from "next/image";

import VerifyPayment from "@/app/payments/verify/components/verify-payment";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Verify Payment | BK Sharing",
  description: "Verify Payment Page",
};

const VerifyPaymentPage = () => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <header className="shadow-xl">
        <div className="flex gap-2 border-r p-5">
          <Image
            src="/images/logo-icon.png"
            alt="logo"
            width={35}
            height={35}
            priority
          />

          <span className="text-xl text-secondary-foreground dark:text-white">
            BK Sharing
          </span>
        </div>
      </header>

      <div className="flex-center">
        <VerifyPayment />
      </div>

      <Footer />
    </div>
  );
};
export default VerifyPaymentPage;
