import { PackageOpenIcon } from "lucide-react";

import Loader from "@/components/loader";
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

  return <div>NotificationList</div>;
};
export default NotificationList;
