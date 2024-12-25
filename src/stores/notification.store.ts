import { create } from "zustand";

import { NotificationType } from "@/schemas/notification.schema";

type NotificationState = {
  notifications: NotificationType[];
  numberOfUnreadNotifications: number;
};

type NotificationAction = {
  setNotifications: (notifications: NotificationType[]) => void;
  addNotification: (notification: NotificationType) => void;
  updateIsReadNotification: (notificationId: number) => void;
};

const useNotificationStore = create<NotificationState & NotificationAction>(
  (set) => ({
    // Initial state
    notifications: [],
    numberOfUnreadNotifications: 0,

    // Actions
    setNotifications: (notifications) =>
      set({
        notifications,
        numberOfUnreadNotifications: notifications.filter(
          (notification) => !notification.isRead
        ).length,
      }),
    addNotification: (notification) =>
      set((state) => {
        const isDuplicate = state.notifications.some(
          (n) => n.id === notification.id
        );
        if (isDuplicate) return state; // Không thêm thông báo trùng lặp

        return {
          notifications: [notification, ...state.notifications],
          numberOfUnreadNotifications: state.numberOfUnreadNotifications + 1,
        };
      }),
    updateIsReadNotification: (notificationId) =>
      set((state) => {
        const isUpdated = state.notifications.some(
          (n) => n.id === notificationId && !n.isRead
        );
        if (!isUpdated) return state; // Không cập nhật nếu đã đọc

        return {
          notifications: state.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          ),
          numberOfUnreadNotifications: state.numberOfUnreadNotifications - 1,
        };
      }),
  })
);

export default useNotificationStore;
