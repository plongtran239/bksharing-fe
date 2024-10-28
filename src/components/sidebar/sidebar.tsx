import Image from "next/image";
import Link from "next/link";

import userApi from "@/apis/user.api";
import AvatarDropdown from "@/components/avatar-dropdown";
import SideNavbar from "@/components/sidebar/side-navbar";
import { Separator } from "@/components/ui/separator";
import { ROLES } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const Sidebar = async () => {
  const { sessionToken, role } = useGetFromCookie(["sessionToken", "role"]);

  let user = null;

  if (sessionToken) {
    const {
      payload: { data },
    } = await userApi.getMe(sessionToken);
    user = data;
  }

  return (
    <aside className="sticky left-0 top-0 flex h-screen flex-col justify-between bg-secondary p-6 max-sm:hidden lg:w-[280px]">
      <div>
        <Link
          href={role === ROLES.ADMIN ? "/admin/dashboard" : "/mentor/courses"}
          className="max-lg:flex-center flex lg:gap-4 lg:px-4"
        >
          <Image
            src="/images/logo-icon.png"
            alt="logo"
            width={35}
            height={35}
            priority
          />

          <span className="text-xl text-secondary-foreground max-lg:hidden">
            BK Sharing
          </span>
        </Link>

        <SideNavbar role={role} />
      </div>

      <div className="">
        <Separator className="mb-5 bg-secondary-foreground" />
        <div className="flex-center">
          <AvatarDropdown
            name={user?.name}
            avatar={user?.thumbnail?.originalUrl}
            role={role}
          />
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
