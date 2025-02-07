"use client";

import { ChevronUpIcon } from "lucide-react";
import { useTranslations } from "next-intl";
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
import { MENTOR_STATUS, ROLES } from "@/constants/enum";
import { AvatarDropdownMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";

interface IProps {
  name?: string;
  avatar?: string;
  role?: string;
  mentorStatus?: MENTOR_STATUS;
  handleClick?: () => void;
  className?: string;
  mobileDisplayName?: boolean;
  isSidebar?: boolean;
}

const AvatarDropdown = ({
  name,
  avatar,
  role,
  mentorStatus,
  handleClick,
  className,
  mobileDisplayName,
  isSidebar,
}: IProps) => {
  const t = useTranslations("dropdown");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex-between gap-2 rounded-xl p-1 text-black focus-within:border-none focus-visible:border-none",
          className,
          {
            "w-full hover:bg-primary hover:text-primary-foreground": isSidebar,
          }
        )}
      >
        <div className="flex-center gap-1">
          <div className="relative h-7 w-7">
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
            className={cn("line-clamp-1 flex-1 font-medium max-sm:hidden", {
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
        align={isSidebar ? "start" : "center"}
      >
        <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {AvatarDropdownMenuItems[ROLES[role as keyof typeof ROLES]].map(
          (item, index) => {
            if (
              mentorStatus &&
              mentorStatus === MENTOR_STATUS.PENDING &&
              item.label === "mentorDashboard"
            ) {
              return (
                <>
                  {item.hasSeparator && <DropdownMenuSeparator />}

                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    disabled
                  >
                    {item.icon}
                    {t(item.label)}
                  </DropdownMenuItem>
                </>
              );
            }

            return (
              <Link key={index} href={item.href} onClick={handleClick}>
                {item.hasSeparator && <DropdownMenuSeparator />}

                <DropdownMenuItem className="flex items-center gap-2">
                  {item.icon}
                  {t(item.label)}
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
