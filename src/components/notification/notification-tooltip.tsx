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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useNotificationStore from "@/stores/notification.store";

const NotificationTooltip = ({ className }: { className?: string }) => {
  const { toast } = useToast();

  const {
    notifications,
    numberOfUnreadNotifications,
    setNotifications,
    addNotification,
  } = useNotificationStore();

  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const {
        payload: { data },
      } = await notificationApi.getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((res) => console.log("service worker registered", res))
        .catch((err) =>
          console.error("service worker registration failed", err)
        );

      navigator.serviceWorker.addEventListener("message", ({ data }) => {
        toast({
          title: data.notification.title,
          description: JSON.parse(data.notification.body).content,
          variant: "default",
        });

        addNotification(JSON.parse(data.notification.body));
      });
    }

    return () => {
      navigator.serviceWorker.removeEventListener("message", ({ data }) => {
        toast({
          title: data.notification.title,
          description: JSON.parse(data.notification.body).content,
          variant: "default",
        });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

            {numberOfUnreadNotifications > 0 && (
              <span className="absolute -right-4 -top-4 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
                {numberOfUnreadNotifications}
              </span>
            )}
          </div>
        </TooltipTrigger>

        <TooltipContent
          ref={tooltipRef}
          className={cn(
            "translate-y-6 border border-primary bg-white",
            className
          )}
        >
          <NotificationList notifications={notifications} loading={loading} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default NotificationTooltip;
