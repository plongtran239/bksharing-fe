import Image from "next/image";
import Link from "next/link";

import userApi from "@/apis/user.api";
import AppSidebarContent from "@/components/app-sidebar-content";
import AvatarDropdown from "@/components/avatar-dropdown";
import LangSwitcher from "@/components/lang-switcher";
import NotificationTooltip from "@/components/notification/notification-tooltip";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ROLES } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const AppSidebar = async () => {
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
    <Sidebar>
      <SidebarHeader className="p-5">
        <Link
          href={role === ROLES.ADMIN ? "/admin/dashboard" : "/mentor/courses"}
          className="flex-center flex gap-4 px-4"
        >
          <Image
            src="/images/logo-icon.png"
            alt="logo"
            width={35}
            height={35}
            priority
          />

          <span className="text-xl font-semibold text-secondary-foreground">
            BK Sharing
          </span>
        </Link>
      </SidebarHeader>

      <AppSidebarContent role={role} />

      <SidebarSeparator className="bg-black" />

      <SidebarFooter className="p-2">
        <div className="flex-between gap-5">
          <AvatarDropdown
            name={user?.name}
            avatar={user?.thumbnail?.originalUrl}
            role={role}
            isSidebar
            mobileDisplayName
          />

          <NotificationTooltip className="-translate-y-4" />

          <LangSwitcher lang={lang} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
