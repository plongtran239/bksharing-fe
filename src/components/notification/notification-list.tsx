import { PackageOpenIcon } from "lucide-react";

import Loader from "@/components/loader";
import NotificationItem from "@/components/notification/notification-item";
import { Separator } from "@/components/ui/separator";
import { NotificationType } from "@/schemas/notification.schema";

interface IProps {
  notifications: NotificationType[];
  loading?: boolean;
}

const NotificationList = ({ notifications, loading }: IProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 p-5 text-base text-foreground">
        <Loader />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 p-5 text-base text-foreground">
        <PackageOpenIcon size={24} />
        <p className="text-sm">Không có thông báo nào</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="p-4 text-base text-primary">
        Thông báo ({notifications.length})
      </h1>

      <Separator />

      <div className="max-h-[437px] w-80 overflow-y-scroll overscroll-none">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};
export default NotificationList;
