"use client";

import {
  GraduationCapIcon,
  HomeIcon,
  KeyRoundIcon,
  LibraryIcon,
  TextQuoteIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import LogoutButton from "@/app/(home)/components/logout-button";
import { useAppContext } from "@/app/app-provider";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type MenuItemsType = {
  label: string;
  href: string;
  icon: JSX.Element;
}[];

const menuItems: MenuItemsType = [
  { label: "Home", href: "/", icon: <HomeIcon size={18} strokeWidth={2.5} /> },
  {
    label: "Courses",
    href: "/courses",
    icon: <LibraryIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "Mentors",
    href: "/mentors",
    icon: <GraduationCapIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "Blogs",
    href: "/blogs",
    icon: <TextQuoteIcon size={18} strokeWidth={2.5} />,
  },
];

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

        <div className="flex-between gap-20">
          <Navbar menuItems={menuItems} isActive={isActive} />

          <>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex-between gap-2 max-lg:hidden">
                  <Image
                    src={user.avatar || "/images/default-user.png"}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                    priority
                  />
                  <span>{user.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <Link href="/users/id">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <UserIcon size={16} />
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/change-password">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <KeyRoundIcon size={16} />
                      Change Password
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <LogoutButton />
                </DropdownMenuContent>
              </DropdownMenu>
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

          <div className="lg:hidden">
            <Sidebar menuItems={menuItems} isActive={isActive} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
