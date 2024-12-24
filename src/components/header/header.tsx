"use client";

import Image from "next/image";
import Link from "next/link";

import AuthButton from "@/app/(root)/(home)/components/auth-button";
import AvatarDropdown from "@/components/avatar-dropdown";
import MessageBoxDialog from "@/components/chat/message-box-dialog";
import MessageTooltip from "@/components/chat/message-tooltip";
import MobileSidebar from "@/components/header/mobile-sidebar";
import Navbar from "@/components/header/navbar";
import LangSwitcher from "@/components/lang-switcher";
import NotificationTooltip from "@/components/notification/notification-tooltip";
import { ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";

const Header = ({ lang }: { lang: string }) => {
  const { user, openMessageBox } = useAppContext();

  return (
    <>
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
            {user?.accountType !== ROLES.ADMIN && <Navbar />}

            {user ? (
              <div className="flex-center space-x-5">
                <MessageTooltip />

                <NotificationTooltip />

                <AvatarDropdown
                  name={user.name}
                  avatar={user.avatar?.originalUrl}
                  role={user.accountType}
                />
              </div>
            ) : (
              <AuthButton />
            )}

            <LangSwitcher lang={lang} />

            <MobileSidebar user={user} className="lg:hidden" />
          </div>
        </div>
      </header>

      <MessageBoxDialog isOpen={openMessageBox} />
    </>
  );
};
export default Header;
