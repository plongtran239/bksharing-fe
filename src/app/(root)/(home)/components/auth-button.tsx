import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const AuthButton = () => {
  const t = useTranslations("common");

  return (
    <div className="flex-between gap-3 max-lg:hidden">
      <Link href="/login">
        <Button className="w-28 rounded-full">{t("login")}</Button>
      </Link>
      <Link href="/register">
        <Button className="w-28 rounded-full" variant="outline">
          {t("register")}
        </Button>
      </Link>
    </div>
  );
};
export default AuthButton;
