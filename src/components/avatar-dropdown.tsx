import Image from "next/image";
import Link from "next/link";

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
import {
  AdminAvatarDropdownMenuItems,
  AvatarDropdownMenuItems,
} from "@/constants/menu-item";
import { cn } from "@/lib/utils";
import { AccountType } from "@/schemas";

interface IProps {
  user: AccountType;
  role: string;
  handleClick?: () => void;
  className?: string;
  mobileDisplayName?: boolean;
}

const AvatarDropdown = ({
  user,
  role,
  handleClick,
  className,
  mobileDisplayName,
}: IProps) => {
  const isAdmin = role === ROLES.ADMIN;

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
            src={user.thumbnail?.originalUrl || "/images/default-user.png"}
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
            "max-lg:hidden": isAdmin,
          })}
        >
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {isAdmin
          ? AdminAvatarDropdownMenuItems.map((item, index) => (
              <Link key={index} href={item.href} onClick={handleClick}>
                <DropdownMenuItem className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </DropdownMenuItem>
              </Link>
            ))
          : AvatarDropdownMenuItems.map((item, index) => {
              if (role === ROLES.STUDENT) {
                if (item.label === "Meeting" || item.label === "Profile")
                  return null;
              }

              return (
                <Link key={index} href={item.href} onClick={handleClick}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </DropdownMenuItem>
                </Link>
              );
            })}

        <DropdownMenuSeparator />

        <LogoutButton handleClick={handleClick} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AvatarDropdown;
