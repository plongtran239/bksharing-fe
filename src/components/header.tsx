import { KeyRound, User } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import LogoutButton from "@/app/(home)/components/logout-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const cookieStore = cookies();

  const token = cookieStore.get("sessionToken")?.value;

  return (
    <header className="flex-between container py-5">
      <Link href="/" className="flex items-center gap-2">
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
        <ul className="flex-between gap-10 text-[#5B5B5B] dark:text-white">
          <li className="hover:underline">
            <Link href="/">Home</Link>
          </li>
          <li>Courses</li>
          <li>Mentors</li>
          <li>Blogs</li>
        </ul>

        <>
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex-between gap-2">
                <Image
                  src="/images/default-user.png"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                  priority
                />
                <span>Long Tran</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <Link href="/me">
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
            <div className="flex-between gap-5">
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
    </header>
  );
};
export default Header;
