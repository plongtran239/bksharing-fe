"use client";

import { ChevronUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoutButton from "@/app/(root)/(home)/components/logout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLES } from "@/constants/enum";
import { AvatarDropdownMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";

interface IProps {
  name?: string;
  avatar?: string;
  role?: string;
  handleClick?: () => void;
  className?: string;
  mobileDisplayName?: boolean;
  isSidebar?: boolean;
}

const AvatarDropdown = ({
  name,
  avatar,
  role,
  handleClick,
  className,
  mobileDisplayName,
  isSidebar,
}: IProps) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex-between gap-2 rounded-xl p-1 text-black focus-within:border-none focus-visible:border-none",
          className,
          {
            "hover:bg-primary hover:text-primary-foreground": isSidebar,
          }
        )}
      >
        <div className="flex-center gap-2">
          <div className="relative h-[28px] w-[28px]">
            <Image
              src={avatar || "/images/default-user.png"}
              alt="avatar"
              sizes="(max-width: 640px) 100px,"
              fill
              priority
              className="rounded-full"
            />
          </div>
          <span
            className={cn("max-sm:hidden", {
              "max-sm:block": mobileDisplayName,
              "max-lg:hidden": role === ROLES.ADMIN || role === ROLES.MENTOR,
            })}
          >
            {name}
          </span>
        </div>

        {isSidebar && <ChevronUpIcon size={16} />}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn({
          "min-w-[239px]": isSidebar,
        })}
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {AvatarDropdownMenuItems[ROLES[role as keyof typeof ROLES]].map(
          (item, index) => {
            if (role === ROLES.MENTOR) {
              if (pathname === "/mentors" && item.label === "Student View") {
                return null;
              }

              if (
                !pathname.startsWith("/mentor") &&
                item.label === "Student View"
              ) {
                return null;
              }

              if (
                pathname.startsWith("/mentor") &&
                pathname !== "/mentors" &&
                item.label === "Mentor Dashboard"
              ) {
                return null;
              }
            }

            return (
              <Link key={index} href={item.href} onClick={handleClick}>
                {item.hasSeparator && <DropdownMenuSeparator />}

                <DropdownMenuItem className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </DropdownMenuItem>
              </Link>
            );
          }
        )}

        <DropdownMenuSeparator />

        <LogoutButton handleClick={handleClick} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AvatarDropdown;
