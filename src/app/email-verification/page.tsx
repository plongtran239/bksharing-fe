import { ShieldEllipsisIcon } from "lucide-react";

const VerifyEmailPage = () => {
  return (
    <div className="flex-center h-screen flex-col gap-5">
      <ShieldEllipsisIcon size={64} className="text-gray-500" />
      <h1 className="text-2xl font-semibold text-black">
        Tài khoản của bạn đang chờ được xác thực
      </h1>
      <p className="font-medium text-black">
        Hãy kiểm tra email của bạn và nhấn vào liên kết xác thực để hoàn tất quá
        trình xác thực.
      </p>
    </div>
  );
};
export default VerifyEmailPage;
