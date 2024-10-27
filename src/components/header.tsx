import Image from "next/image";
import Link from "next/link";

import userApi from "@/apis/user.api";
import AvatarDropdown from "@/components/avatar-dropdown";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const Header = async () => {
  const { sessionToken, role } = useGetFromCookie(["sessionToken", "role"]);

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

          <span className="text-xl text-secondary-foreground dark:text-white">
            BK Sharing
          </span>
        </Link>

        <div className="flex-between gap-20 max-lg:gap-5">
          <Navbar role={role} />

          <>
            {user ? (
              <AvatarDropdown
                name={user.name}
                avatar={user.thumbnail?.originalUrl}
                role={role}
              />
            ) : (
              <div className="flex-between gap-5 max-lg:hidden">
                <Link href="/login">
                  <Button className="w-28 rounded-full">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-28 rounded-full" variant="outline">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </>

          <Sidebar user={user} role={role} className="lg:hidden" />
        </div>
      </div>
    </header>
  );
};
export default Header;
