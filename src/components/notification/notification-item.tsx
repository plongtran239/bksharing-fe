"use client";

import { useRouter } from "next/navigation";

import notificationApi from "@/apis/notification.api";
import {
  COURSE_STATUS,
  NOTIFICATION_RELATION_TYPE,
  ROLES,
} from "@/constants/enum";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { NotificationType } from "@/schemas/notification.schema";

const NotificationItem = ({
  notification,
}: {
  notification: NotificationType;
}) => {
  const router = useRouter();
  const { user } = useAppContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      await notificationApi.readNotification(notification.id, {
        isRead: true,
      });

      switch (notification.relationType) {
        case NOTIFICATION_RELATION_TYPE.SUBSCRIPTION:
          if (user.accountType === ROLES.STUDENT) {
            router.push("/subscriptions");
          }
          if (user.accountType === ROLES.MENTOR) {
            router.push("/mentor/requests");
          }
          router.refresh();
          break;

        case NOTIFICATION_RELATION_TYPE.COURSE:
          if (user.accountType === ROLES.MENTOR) {
            router.push(`/mentor/courses?status=${COURSE_STATUS.APPROVED}`);
          }
          router.refresh();
          break;

        default:
          break;
      }

      console.log("Notification read successfully");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div
      className="flex-between gap-5 p-4 hover:bg-primary/30"
      onClick={handleClick}
    >
      <div className="flex-1">
        <p
          className={cn("text-base font-medium text-black", {
            "font-semibold": !notification.isRead,
          })}
        >
          {notification.title}
        </p>
        <p
          className={cn("line-clamp-2 text-sm text-foreground", {
            "font-semibold text-black": !notification.isRead,
          })}
        >
          {notification.content}
        </p>
      </div>

      {!notification.isRead && (
        <div className="h-2 w-2 rounded-full bg-primary" />
      )}
    </div>
  );
};
export default NotificationItem;
