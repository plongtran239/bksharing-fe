"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

import chatApi from "@/apis/chat.api";
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
import { useAppContext } from "@/providers/app.provider";

const AppSidebarContent = ({ role }: { role: string }) => {
  const t = useTranslations("sidebar");

  const { socketClient } = useAppContext();

  const [numberOfUnreadMessages, setNumberOfUnreadMessages] = useState(0);

  // Fetch chat rooms
  const fetchChatRooms = async () => {
    try {
      const {
        payload: { data },
      } = await chatApi.getChatList();

      const unreadMessages = data.reduce((acc, room) => {
        return acc + (!room.isSeen && room.lastMessage.isReceiver ? 1 : 0);
      }, 0);

      setNumberOfUnreadMessages(unreadMessages);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    if (!socketClient) return;

    socketClient.on("newMessage", () => {
      fetchChatRooms();
    });

    return () => {
      socketClient.off("newMessage");
    };
  }, [socketClient]);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            {SidebarMenuItems[role as keyof typeof SidebarMenuItems]?.map(
              (item) => {
                if (item.label === "chat") {
                  return (
                    <SidebarMenuItem key={item.label}>
                      <Link href={item.href}>
                        <SidebarMenuButton className="text-base">
                          <div className="flex-between w-full">
                            <div className="flex-center gap-2">
                              {item.icon}
                              {t(item.label)}
                            </div>
                            {numberOfUnreadMessages > 0 && (
                              <div className="flex-center h-5 w-5 rounded-full bg-primary text-sm text-white">
                                {numberOfUnreadMessages}
                              </div>
                            )}
                          </div>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <Collapsible key={item.label}>
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
                                <SidebarMenuSubButton
                                  asChild
                                  className="text-sm"
                                >
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
                );
              }
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
export default AppSidebarContent;
