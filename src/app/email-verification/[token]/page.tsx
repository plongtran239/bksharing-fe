import { Metadata } from "next";

import VerifyEmail from "@/app/email-verification/[token]/components/verify-email";

export const metadata: Metadata = {
  title: "Verify Email | BK Sharing",
  description: "Verify your email to complete the registration process",
};

const VerifyEmailPage = () => {
  return <VerifyEmail />;
};
export default VerifyEmailPage;
