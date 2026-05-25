import axios from "@/lib/axios";

export const notificationService = {
  async getNotifications() {
    const response =
      await axios.get(
        "/notifications"
      );

    return response.data.data;
  },

  async markAsRead(
    id: string
  ) {
    await axios.patch(
      `/notifications/${id}/read`
    );
  },

  async clearAll() {
    const response =
      await axios.delete(
        "/notifications/clear-all"
      );

    return response.data;
  },
};