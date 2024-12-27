import { ShieldEllipsisIcon } from "lucide-react";

const VerifyResetPasswordPage = () => {
  return (
    <div className="flex-center h-screen flex-col gap-5">
      <ShieldEllipsisIcon size={64} className="text-gray-500" />
      <h1 className="text-2xl font-semibold text-black">
        Tài khoản của bạn đang chờ được xác thực
      </h1>
      <p className="font-medium text-black">
        Hãy kiểm tra email của bạn và nhấn vào liên kết để thay đổi mật khẩu.
      </p>
    </div>
  );
};
export default VerifyResetPasswordPage;
