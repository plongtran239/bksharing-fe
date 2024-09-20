import { Metadata } from "next";

import ChangePasswordForm from "@/app/(user)/change-password/components/change-password-form";

export const metadata: Metadata = {
  title: "Change Password | BK Sharing",
  description: "Change your account password",
};

const ChangePassword = () => {
  return (
    <section className="bg-[#9DCCFF]/30">
      <div className="flex-center container py-10">
        <ChangePasswordForm />
      </div>
    </section>
  );
};
export default ChangePassword;
