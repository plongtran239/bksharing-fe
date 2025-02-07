"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import userApi from "@/apis/user.api";
import AuthButton from "@/app/(root)/(home)/components/auth-button";
import AvatarDropdown from "@/components/avatar-dropdown";
import MessageBoxDialog from "@/components/chat/message-box-dialog";
import MessageTooltip from "@/components/chat/message-tooltip";
import MobileSidebar from "@/components/header/mobile-sidebar";
import Navbar from "@/components/header/navbar";
import LangSwitcher from "@/components/lang-switcher";
import NotificationTooltip from "@/components/notification/notification-tooltip";
import { Button } from "@/components/ui/button";
import { MENTOR_STATUS, ROLES } from "@/constants/enum";
import { useAppContext } from "@/providers/app.provider";

const Header = ({ lang }: { lang: string }) => {
  const router = useRouter();

  const { user, openMessageBox } = useAppContext();

  const [mentorStatus, setMentorStatus] = useState<MENTOR_STATUS | undefined>();

  useEffect(() => {
    async function getMentorProfile() {
      const {
        payload: { data },
      } = await userApi.getMentorProfileClient();

      setMentorStatus(data.status);
    }

    if (user?.accountType === ROLES.MENTOR) {
      getMentorProfile();
    }
  }, [user]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white shadow">
        <div className="flex-between container py-5 max-sm:px-5">
          <div className="flex items-center gap-5">
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

            {user && mentorStatus === MENTOR_STATUS.PENDING && (
              <Button
                variant="link"
                onClick={() => router.push("/users/profile")}
              >
                Tài khoản của bạn đang chờ duyệt. Hãy cập nhật hồ sơ!
              </Button>
            )}
          </div>

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
                  mentorStatus={mentorStatus}
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
