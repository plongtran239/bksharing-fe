"use client";

import { BellIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import notificationApi from "@/apis/notification.api";
import NotificationList from "@/components/notification/notification-list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/schemas/notification.schema";

const NotificationTooltip = () => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Close tooltip when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      try {
        const {
          payload: { data },
        } = await notificationApi.getNotifications();

        setNotifications(data);

        const numberOfUnreadNotifications = data.filter(
          (notification) => !notification.isRead
        ).length;

        setUnreadNotifications(numberOfUnreadNotifications);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger
          asChild
          className={cn("hover:text-primary", { "text-primary": open })}
          onClick={() => setOpen(!open)}
        >
          <div className="relative">
            <BellIcon size={18} strokeWidth={2.5} />

            {unreadNotifications > 0 && (
              <span className="absolute -right-4 -top-4 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
                {unreadNotifications}
              </span>
            )}
          </div>
        </TooltipTrigger>

        <TooltipContent
          ref={tooltipRef}
          className="translate-y-6 border border-primary bg-white"
        >
          <NotificationList notifications={notifications} loading={loading} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default NotificationTooltip;
