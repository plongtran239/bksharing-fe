"use client";

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
}

const AvatarDropdown = ({
  name,
  avatar,
  role,
  handleClick,
  className,
  mobileDisplayName,
}: IProps) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex-between gap-2 focus-within:border-none focus-visible:border-none",
          className
        )}
      >
        <div className="relative h-[32px] w-[32px]">
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
          className={cn("text-black max-sm:hidden", {
            "max-sm:block": mobileDisplayName,
            "max-lg:hidden": role === ROLES.ADMIN || role === ROLES.MENTOR,
          })}
        >
          {name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {AvatarDropdownMenuItems[ROLES[role as keyof typeof ROLES]].map(
          (item, index) => {
            if (role === ROLES.MENTOR) {
              if (
                (pathname.startsWith("/mentor") &&
                  item.href.includes("/mentor")) ||
                (!pathname.startsWith("/mentor") && item.href === "/")
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
