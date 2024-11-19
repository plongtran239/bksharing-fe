import Image from "next/image";
import Link from "next/link";

import userApi from "@/apis/user.api";
import AuthButton from "@/app/(root)/(home)/components/auth-button";
import AvatarDropdown from "@/components/avatar-dropdown";
import MobileSidebar from "@/components/header/mobile-sidebar";
import Navbar from "@/components/header/navbar";
import LangSwitcher from "@/components/lang-switcher";
import { ROLES } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const Header = async () => {
  const { sessionToken, role, lang } = useGetFromCookie([
    "sessionToken",
    "role",
    "lang",
  ]);

  let user = null;

  if (sessionToken) {
    const {
      payload: { data },
    } = await userApi.getMe(sessionToken);
    user = data;
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow">
      <div className="flex-between container py-5 max-sm:px-5">
        <Link href="/" className="mr-2 flex items-center gap-4">
          <Image
            src="/images/logo-icon.png"
            alt="logo"
            width={35}
            height={35}
            priority
          />

          <span className="text-xl font-semibold text-secondary-foreground dark:text-white">
            BK Sharing
          </span>
        </Link>

        <div className="flex-between gap-10 max-lg:gap-5">
          {role !== ROLES.ADMIN && <Navbar />}

          {user ? (
            <AvatarDropdown
              name={user.name}
              avatar={user.thumbnail?.originalUrl}
              role={role}
            />
          ) : (
            <AuthButton />
          )}

          <LangSwitcher lang={lang} />

          <MobileSidebar user={user} role={role} className="lg:hidden" />
        </div>
      </div>
    </header>
  );
};
export default Header;
