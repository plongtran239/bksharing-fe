import http from "@/lib/http";
import { ListResponseType } from "@/schemas";
import { NotificationType } from "@/schemas/notification.schema";

const notificationApi = {
  getNotifications: () =>
    http.get<ListResponseType<NotificationType>>("/notifications"),

  readNotification: (id: number, body: { isRead: boolean }) =>
    http.patch(`/notifications/${id}`, body),
};

export default notificationApi;
