import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import AvatarDropdown from "@/components/avatar-dropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavbarMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";
import { UserType } from "@/schemas";

interface IProps {
  isActive: (href: string) => boolean;
  user: UserType | null;
  className?: string;
}

const Sidebar = ({ isActive, user, className }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={handleClick}>
      <SheetTrigger onClick={() => setOpen(true)} className={cn("", className)}>
        <MenuIcon size={20} />
      </SheetTrigger>
      <SheetContent className="flex w-80 flex-col items-start justify-between">
        <ul className="mt-10 flex flex-col items-start justify-between gap-10 text-[#5B5B5B]">
          <SheetTitle className="hidden"></SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
          {NavbarMenuItems.map((item, index) => (
            <li
              key={index}
              className={cn("flex-between w-full", {
                "font-semibold text-primary": isActive(item.href),
              })}
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
            <AvatarDropdown
              user={user}
              handleClick={handleClick}
              mobileDisplayName={true}
            />
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
