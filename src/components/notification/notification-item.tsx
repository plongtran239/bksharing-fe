"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import notificationApi from "@/apis/notification.api";
import {
  COURSE_STATUS,
  NOTIFICATION_RELATION_TYPE,
  ROLES,
} from "@/constants/enum";
import { cn, convertMilisecondsToLocaleString } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { NotificationType } from "@/schemas/notification.schema";
import useNotificationStore from "@/stores/notification.store";

const NotificationItem = ({
  notification,
}: {
  notification: NotificationType;
}) => {
  const tTitle = useTranslations("notification.title");

  const router = useRouter();
  const { user } = useAppContext();
  const { updateIsReadNotification } = useNotificationStore();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    switch (notification.relationType) {
      case NOTIFICATION_RELATION_TYPE.SUBSCRIPTION:
        if (user.accountType === ROLES.STUDENT) {
          router.push("/subscriptions");
        }
        if (user.accountType === ROLES.MENTOR) {
          router.push("/mentor/requests");
        }
        break;

      case NOTIFICATION_RELATION_TYPE.COURSE:
        if (user.accountType === ROLES.MENTOR) {
          router.push(`/mentor/courses?status=${COURSE_STATUS.APPROVED}`);
        }
        break;

      default:
        break;
    }

    try {
      if (!notification.isRead) {
        await notificationApi.readNotification(notification.id, {
          isRead: true,
        });

        updateIsReadNotification(notification.id);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const generateContent = () => {
    switch (notification.title) {
      case "Course Reported":
        return "Một khóa học đã bị báo cáo";
      case "Course Approved":
        return "Khóa học của bạn đã được duyệt";
      case "Subscription Request":
        return "Bạn có yêu cầu đăng ký mới";
      case "New Course Created":
        return "Một gia sư đã tạo khóa học mới và đang chờ duyệt";
      case "Subscription Approved":
        return "Yêu cầu đăng ký của bạn đã được duyệt";
      case "Payment Successful":
        return "Học viên đã thanh toán cho khóa học của bạn";
      case "Report Resolved":
        return "Báo cáo của bạn đã được giải quyết";
      case "Account Suspension Warning":
        return "Tài khoản của bạn sắp bị tạm khóa";
      case "Mentor Approved":
        return "Yêu cầu trở thành gia sư của bạn đã được duyệt";
      case "Audio Call Created":
        return "Bạn có cuộc gọi mới";
      default:
        break;
    }
  };

  return (
    <div
      className="flex-between gap-5 p-4 hover:bg-primary/30"
      onClick={handleClick}
    >
      <div className="flex-1">
        <p className="text-foreground">
          {convertMilisecondsToLocaleString(notification.createdAt)}
        </p>
        <p
          className={cn("text-base font-medium text-black", {
            "font-semibold": !notification.isRead,
          })}
        >
          {tTitle(notification.title)}
        </p>
        <p
          className={cn("line-clamp-2 text-sm text-foreground", {
            "font-semibold text-black": !notification.isRead,
          })}
        >
          {generateContent()}
        </p>
      </div>

      {!notification.isRead && (
        <div className="h-2 w-2 rounded-full bg-primary" />
      )}
    </div>
  );
};
export default NotificationItem;
