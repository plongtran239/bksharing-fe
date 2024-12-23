import { NotificationType } from "@/schemas/notification.schema";

const NotificationItem = ({
  notification,
}: {
  notification: NotificationType;
}) => {
  return (
    <div className="text-black">
      <p>{notification.title}</p>
      <p>{notification.content}</p>
    </div>
  );
};
export default NotificationItem;
