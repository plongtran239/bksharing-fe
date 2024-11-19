"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SidebarMenuItems } from "@/constants/menu-item";

const AppSidebarContent = ({ role }: { role: string }) => {
  const t = useTranslations("sidebar");

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            {SidebarMenuItems[role as keyof typeof SidebarMenuItems]?.map(
              (item) => (
                <Collapsible key={item.label} defaultOpen>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild className="text-base">
                        {item.subs ? (
                          <div className="flex-between">
                            <div className="flex-center gap-2">
                              {item.icon}
                              {t(item.label)}
                            </div>
                            {item.subs && <ChevronDown size={20} />}
                          </div>
                        ) : (
                          <Link href={item.href}>
                            {item.icon}
                            {t(item.label)}
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      {item.subs && (
                        <SidebarMenuSub>
                          {item.subs.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton asChild className="text-sm">
                                <Link href={subItem.href}>
                                  {t(subItem.label)}
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
  );
};
export default AppSidebarContent;
