import {
    useCallback,
    useEffect,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchNotificationsRequest,
    fetchUnreadNotificationsRequest,
    fetchUnreadCountRequest,

    markNotificationAsReadRequest,
    markAllNotificationsAsReadRequest,

    clearNotificationError,
    clearNotificationSuccess,
} from "../notificationSlice";

const EMPTY_ARRAY = [];

const useNotifications = ({
    autoFetchCount = false,
    pollingInterval = 15000,
} = {}) => {
    const dispatch = useDispatch();

    const user = useSelector(
        (state) => state.auth?.user
    );

    const canAccessNotifications =
        user?.roles?.includes("Provider") ||
        user?.roles?.includes("Nurse");

    const notificationState =
        useSelector(
            (state) =>
                state.notifications || {}
        );

    const {
        notifications =
        EMPTY_ARRAY,

        unreadNotifications =
        EMPTY_ARRAY,

        unreadCount = 0,

        loading = false,

        unreadLoading = false,

        countLoading = false,

        markingRead = false,

        markingAllRead = false,

        error = null,

        successMessage = null,
    } = notificationState;

    const getNotifications =
        useCallback(() => {
            dispatch(
                fetchNotificationsRequest()
            );
        }, [dispatch]);

    const getUnreadNotifications =
        useCallback(() => {
            dispatch(
                fetchUnreadNotificationsRequest()
            );
        }, [dispatch]);

    const getUnreadCount =
        useCallback(() => {
            dispatch(
                fetchUnreadCountRequest()
            );
        }, [dispatch]);

    const markAsRead =
        useCallback(
            (id) => {
                if (!id) {
                    return;
                }

                dispatch(
                    markNotificationAsReadRequest(
                        id
                    )
                );
            },
            [dispatch]
        );

    const markAllAsRead =
        useCallback(() => {
            dispatch(
                markAllNotificationsAsReadRequest()
            );
        }, [dispatch]);

    const clearError =
        useCallback(() => {
            dispatch(
                clearNotificationError()
            );
        }, [dispatch]);

    const clearSuccess =
        useCallback(() => {
            dispatch(
                clearNotificationSuccess()
            );
        }, [dispatch]);

    /*
     * Automatically fetch the unread count
     * when requested by a component such as Header.
     *
     * It also polls periodically so a newly-created
     * appointment notification appears without
     * manually refreshing the browser.
     */
    useEffect(() => {
        if (
            !autoFetchCount ||
            !canAccessNotifications
        ) {
            return undefined;
        }

        getUnreadCount();

        const intervalId =
            setInterval(() => {
                getUnreadCount();
            }, pollingInterval);

        return () => {
            clearInterval(intervalId);
        };
    }, [
        autoFetchCount,
        canAccessNotifications,
        pollingInterval,
        getUnreadCount,
    ]);

    return {
        notifications,
        unreadNotifications,
        unreadCount,

        loading,
        unreadLoading,
        countLoading,
        markingRead,
        markingAllRead,

        error,
        successMessage,

        getNotifications,
        getUnreadNotifications,
        getUnreadCount,

        markAsRead,
        markAllAsRead,

        clearError,
        clearSuccess,
    };
};

export default useNotifications;