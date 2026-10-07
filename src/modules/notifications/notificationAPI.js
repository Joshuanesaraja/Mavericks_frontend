import axiosClient from "../../services/axiosClient";

const notificationAPI = {
    /**
     * Get all notifications for the logged-in user.
     */
    getNotifications: async () => {
        const response = await axiosClient.get(
            "/notifications"
        );

        return response.data;
    },

    /**
     * Get unread notifications.
     */
    getUnreadNotifications: async () => {
        const response = await axiosClient.get(
            "/notifications/unread"
        );

        return response.data;
    },

    /**
     * Get unread notification count.
     */
    getUnreadCount: async () => {
        const response = await axiosClient.get(
            "/notifications/unread-count"
        );

        return response.data;
    },

    /**
     * Mark one notification as read.
     */
    markAsRead: async (id) => {
        const response = await axiosClient.put(
            `/notifications/read?id=${id}`
        );

        return response.data;
    },

    /**
     * Mark all notifications as read.
     */
    markAllAsRead: async () => {
        const response = await axiosClient.put(
            "/notifications/read-all"
        );

        return response.data;
    },
};

export default notificationAPI;