import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import userApi from "@/apis/user.api";
import AvatarDropdown from "@/components/avatar-dropdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ROLES } from "@/constants/enum";
import { SidebarMenuItems } from "@/constants/menu-item";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const AppSidebar = async () => {
  const { sessionToken, role } = useGetFromCookie(["sessionToken", "role"]);

  let user = null;

  if (sessionToken) {
    const {
      payload: { data },
    } = await userApi.getMe(sessionToken);
    user = data;
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Link
          href={role === ROLES.ADMIN ? "/admin/dashboard" : "/mentor/courses"}
          className="flex-center flex gap-4 px-4"
        >
          <Image
            src="/images/logo-icon.png"
            alt="logo"
            width={35}
            height={35}
            priority
          />

          <span className="text-xl text-secondary-foreground">BK Sharing</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {SidebarMenuItems[role as keyof typeof SidebarMenuItems]?.map(
                (item) => (
                  <Collapsible
                    key={item.label}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild className="text-base">
                          {item.subs ? (
                            <div className="flex-between">
                              <div className="flex-center gap-2">
                                {item.icon}
                                {item.label}
                              </div>
                              {item.subs && <ChevronDown size={20} />}
                            </div>
                          ) : (
                            <Link href={item.href}>
                              {item.icon}
                              {item.label}
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        {item.subs && (
                          <SidebarMenuSub>
                            {item.subs.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.label}>
                                <SidebarMenuSubButton
                                  asChild
                                  className="text-sm"
                                >
                                  <Link href={subItem.href}>
                                    {subItem.label}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="bg-black" />

      <SidebarFooter className="p-2">
        <AvatarDropdown
          name={user?.name}
          avatar={user?.thumbnail?.originalUrl}
          role={role}
          isSidebar
          mobileDisplayName
        />
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
