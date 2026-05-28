import api from "@/lib/api";
// import axios from "@/lib/axios";

export const notificationService = {
  async getNotifications() {
    const response =
      await api.get(
        "/notifications"
      );

    return response.data.data;
  },

  async markAsRead(
    id: string
  ) {
    await api.patch(
      `/notifications/${id}/read`
    );
  },

  async clearAll() {
    const response =
      await api.delete(
        "/notifications/clear-all"
      );

    return response.data;
  },
};