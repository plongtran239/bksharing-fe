import { Metadata } from "next";

import ChangePasswordForm from "@/app/(root)/(user)/change-password/components/change-password-form";

export const metadata: Metadata = {
  title: "Change Password | BK Sharing",
  description: "Change your account password",
};

const ChangePassword = () => {
  return (
    <section className="bg-secondary">
      <div className="flex-center container py-10 max-sm:py-5 lg:min-h-[calc(100vh-75px-260px)]">
        <ChangePasswordForm />
      </div>
    </section>
  );
};
export default ChangePassword;
