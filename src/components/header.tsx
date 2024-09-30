"use client";

import { motion } from "framer-motion";
import { KeyRound, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import LogoutButton from "@/app/(home)/components/logout-button";
import { useAppContext } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Mentors", href: "/mentors" },
  { label: "Blogs", href: "/blogs" },
];

const Header = () => {
  const { user, setUser } = useAppContext();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const path = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return path === href;
    }

    return path.startsWith(href);
  };

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

          <span className="text-xl text-[#5B5B5B] dark:text-white">
            BK Sharing
          </span>
        </Link>

        <div className="flex-between gap-20">
          <ul className="flex-between gap-10 text-[#5B5B5B] transition-all dark:text-white max-lg:hidden">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`${isActive(item.href) && "font-semibold text-primary"}`}
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <Link href={item.href}>{item.label}</Link>
                </motion.div>
              </li>
            ))}
          </ul>
          <>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex-between gap-2">
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
                      <User size={16} />
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/change-password">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <KeyRound size={16} />
                      Change Password
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <LogoutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex-between gap-5 max-sm:hidden">
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
        </div>
      </div>
    </header>
  );
};
export default Header;
