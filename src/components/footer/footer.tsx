import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="flex-center flex-col bg-third py-10">
      <div className="flex-center w-full flex-col">
        <p className="text-[#B2B3CF]">{t("label")}</p>
        <div className="flex-center mt-4 w-1/4 gap-4 max-xl:w-1/2 max-sm:w-4/5 max-sm:flex-col">
          <Input className="w-full rounded-full px-4 text-white" />
          <Button className="w-24 rounded-full max-sm:w-full">
            {t("button")}
          </Button>
        </div>
      </div>

      <div className="flex-center mt-10 w-full flex-col px-10 max-sm:items-start">
        <ul className="flex gap-4 text-[#B2B3CF] max-sm:flex-col">
          <Link href="#top" className="hover:underline">
            {t("aboutUs")}
          </Link>
          <span className="max-sm:hidden">|</span>
          <Link href="#top" className="hover:underline">
            {t("contactUs")}
          </Link>
          <span className="max-sm:hidden">|</span>
          <Link href="#top" className="hover:underline">
            {t("privacyPolicy")}
          </Link>
          <span className="max-sm:hidden">|</span>
          <Link href="#top" className="hover:underline">
            {t("termsOfService")}
          </Link>
        </ul>
        <p className="mt-4 self-center text-[#B2B3CF]">© 2024 BK Sharing</p>
      </div>
    </footer>
  );
};
export default Footer;
