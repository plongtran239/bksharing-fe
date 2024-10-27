"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import AvatarDropdown from "@/components/avatar-dropdown";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AccountType } from "@/schemas";

interface IProps {
  user: AccountType | null;
  role: string;
  className?: string;
}

const Sidebar = ({ user, role, className }: IProps) => {
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
          <Navbar role={role} isSidebar />
        </ul>

        <div className="w-full">
          <div className="mb-5">
            <Separator />
          </div>

          {user ? (
            <AvatarDropdown
              name={user.name}
              avatar={user.thumbnail?.originalUrl}
              role={role}
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
