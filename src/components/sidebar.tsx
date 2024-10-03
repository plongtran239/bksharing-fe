import { motion } from "framer-motion";
import { KeyRoundIcon, MenuIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import LogoutButton from "@/app/(home)/components/logout-button";
import { UserType } from "@/app/app-provider";
import { MenuItemsType } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface IProps {
  menuItems: MenuItemsType;
  isActive: (href: string) => boolean;
  user: UserType | null;
}

const Sidebar = ({ menuItems, isActive, user }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={handleClick}>
      <SheetTrigger onClick={() => setOpen(true)}>
        <MenuIcon size={20} />
      </SheetTrigger>
      <SheetContent className="flex w-80 flex-col items-start justify-between">
        <ul className="mt-10 flex flex-col items-start justify-between gap-10 text-[#5B5B5B]">
          <SheetTitle className="hidden"></SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`${isActive(item.href) && "font-semibold text-primary"} flex-between w-full`}
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
                <Link href={item.href}>
                  <SheetClose className="flex-center gap-1">
                    {item.icon}
                    {item.label}
                  </SheetClose>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>

        <div className="w-full">
          <div className="mb-5">
            <Separator />
          </div>

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

                <Link href="/users/id" onClick={handleClick}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <UserIcon size={16} />
                    Profile
                  </DropdownMenuItem>
                </Link>

                <Link href="/change-password" onClick={handleClick}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <KeyRoundIcon size={16} />
                    Change Password
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <div onClick={handleClick}>
                  <LogoutButton />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex-center gap-5">
              <Link href="/login">
                <Button onClick={handleClick} className="w-28 rounded-full">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  onClick={handleClick}
                  className="w-28 rounded-full"
                  variant="outline"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default Sidebar;
