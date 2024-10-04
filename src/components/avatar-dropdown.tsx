import Image from "next/image";
import Link from "next/link";

import LogoutButton from "@/app/(home)/components/logout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarDropdownMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";
import { UserType } from "@/schemas/user";

interface IProps {
  user: UserType;
  handleClick?: () => void;
  className?: string;
  mobileDisplayName?: boolean;
}

const AvatarDropdown = ({
  user,
  handleClick,
  className,
  mobileDisplayName,
}: IProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex-between gap-2 focus-within:border-none focus-visible:border-none",
          className
        )}
      >
        <Image
          src={user.avatar || "/images/default-user.png"}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
          priority
        />
        <span
          className={cn("text-black max-sm:hidden", {
            "max-sm:block": mobileDisplayName,
          })}
        >
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {AvatarDropdownMenuItems.map((item, index) => (
          <Link key={index} href={item.href} onClick={handleClick}>
            <DropdownMenuItem className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          </Link>
        ))}

        <DropdownMenuSeparator />

        <button onClick={handleClick} className="w-full">
          <LogoutButton />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AvatarDropdown;
