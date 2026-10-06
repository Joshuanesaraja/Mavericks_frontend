import {
    createSlice,
} from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    unreadNotifications: [],
    unreadCount: 0,

    loading: false,
    unreadLoading: false,
    countLoading: false,
    markingRead: false,
    markingAllRead: false,

    error: null,
    successMessage: null,
};

const notificationSlice = createSlice({
    name: "notifications",

    initialState,

    reducers: {
        /**
         * Fetch all notifications
         */
        fetchNotificationsRequest: (
            state
        ) => {
            state.loading = true;
            state.error = null;
        },

        fetchNotificationsSuccess: (
            state,
            action
        ) => {
            state.loading = false;
            state.notifications =
                Array.isArray(action.payload)
                    ? action.payload
                    : [];
        },

        fetchNotificationsFailure: (
            state,
            action
        ) => {
            state.loading = false;
            state.error =
                action.payload ||
                "Failed to load notifications.";
        },

        /**
         * Fetch unread notifications
         */
        fetchUnreadNotificationsRequest: (
            state
        ) => {
            state.unreadLoading = true;
            state.error = null;
        },

        fetchUnreadNotificationsSuccess: (
            state,
            action
        ) => {
            state.unreadLoading = false;

            state.unreadNotifications =
                Array.isArray(action.payload)
                    ? action.payload
                    : [];
        },

        fetchUnreadNotificationsFailure: (
            state,
            action
        ) => {
            state.unreadLoading = false;
            state.error =
                action.payload ||
                "Failed to load unread notifications.";
        },

        /**
         * Fetch unread count
         */
        fetchUnreadCountRequest: (
            state
        ) => {
            state.countLoading = true;
            state.error = null;
        },

        fetchUnreadCountSuccess: (
            state,
            action
        ) => {
            state.countLoading = false;

            const value =
                action.payload?.count ??
                action.payload ??
                0;

            state.unreadCount =
                Number(value) || 0;
        },

        fetchUnreadCountFailure: (
            state,
            action
        ) => {
            state.countLoading = false;
            state.error =
                action.payload ||
                "Failed to load notification count.";
        },

        /**
         * Mark one notification as read
         */
        markNotificationAsReadRequest: (
            state
        ) => {
            state.markingRead = true;
            state.error = null;
        },

        markNotificationAsReadSuccess: (
            state,
            action
        ) => {
            state.markingRead = false;

            const id =
                action.payload;

            state.notifications =
                state.notifications.map(
                    (notification) =>
                        Number(notification.id) ===
                        Number(id)
                            ? {
                                  ...notification,
                                  is_read: 1,
                                  read_at:
                                      notification.read_at ||
                                      new Date().toISOString(),
                              }
                            : notification
                );

            state.unreadNotifications =
                state.unreadNotifications.filter(
                    (notification) =>
                        Number(notification.id) !==
                        Number(id)
                );

            state.unreadCount =
                Math.max(
                    0,
                    state.unreadCount - 1
                );

            state.successMessage =
                "Notification marked as read.";
        },

        markNotificationAsReadFailure: (
            state,
            action
        ) => {
            state.markingRead = false;
            state.error =
                action.payload ||
                "Failed to mark notification as read.";
        },

        /**
         * Mark all as read
         */
        markAllNotificationsAsReadRequest: (
            state
        ) => {
            state.markingAllRead = true;
            state.error = null;
        },

        markAllNotificationsAsReadSuccess: (
            state
        ) => {
            state.markingAllRead = false;

            state.notifications =
                state.notifications.map(
                    (notification) => ({
                        ...notification,
                        is_read: 1,
                        read_at:
                            notification.read_at ||
                            new Date().toISOString(),
                    })
                );

            state.unreadNotifications = [];
            state.unreadCount = 0;

            state.successMessage =
                "All notifications marked as read.";
        },

        markAllNotificationsAsReadFailure: (
            state,
            action
        ) => {
            state.markingAllRead = false;
            state.error =
                action.payload ||
                "Failed to mark notifications as read.";
        },

        clearNotificationError: (
            state
        ) => {
            state.error = null;
        },

        clearNotificationSuccess: (
            state
        ) => {
            state.successMessage = null;
        },
    },
});

export const {
    fetchNotificationsRequest,
    fetchNotificationsSuccess,
    fetchNotificationsFailure,

    fetchUnreadNotificationsRequest,
    fetchUnreadNotificationsSuccess,
    fetchUnreadNotificationsFailure,

    fetchUnreadCountRequest,
    fetchUnreadCountSuccess,
    fetchUnreadCountFailure,

    markNotificationAsReadRequest,
    markNotificationAsReadSuccess,
    markNotificationAsReadFailure,

    markAllNotificationsAsReadRequest,
    markAllNotificationsAsReadSuccess,
    markAllNotificationsAsReadFailure,

    clearNotificationError,
    clearNotificationSuccess,
} = notificationSlice.actions;

export default notificationSlice.reducer;