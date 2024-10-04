"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAppContext } from "@/app/app-provider";
import AvatarDropdown from "@/components/avatar-dropdown";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";

const Header = () => {
  const path = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return path === href;
    }

    return path.startsWith(href);
  };

  const { user, setUser } = useAppContext();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Navbar isActive={isActive} />

          <>
            {user ? (
              <AvatarDropdown user={user} />
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

          <Sidebar isActive={isActive} user={user} className="lg:hidden" />
        </div>
      </div>
    </header>
  );
};
export default Header;
