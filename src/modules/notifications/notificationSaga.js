import {
    call,
    put,
    takeLatest,
} from "redux-saga/effects";

import notificationAPI from "./notificationAPI";

import {
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
} from "./notificationSlice";

function getErrorMessage(error) {
    return (
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong."
    );
}

/**
 * Fetch all notifications.
 */
function* fetchNotificationsWorker() {
    try {
        const response =
            yield call(
                notificationAPI.getNotifications
            );

        const data =
            response?.data ??
            response ??
            [];

        yield put(
            fetchNotificationsSuccess(
                Array.isArray(data)
                    ? data
                    : []
            )
        );
    } catch (error) {
        yield put(
            fetchNotificationsFailure(
                getErrorMessage(error)
            )
        );
    }
}

/**
 * Fetch unread notifications.
 */
function* fetchUnreadNotificationsWorker() {
    try {
        const response =
            yield call(
                notificationAPI.getUnreadNotifications
            );

        const data =
            response?.data ??
            response ??
            [];

        yield put(
            fetchUnreadNotificationsSuccess(
                Array.isArray(data)
                    ? data
                    : []
            )
        );
    } catch (error) {
        yield put(
            fetchUnreadNotificationsFailure(
                getErrorMessage(error)
            )
        );
    }
}

/**
 * Fetch unread count.
 */
function* fetchUnreadCountWorker() {
    try {
        const response =
            yield call(
                notificationAPI.getUnreadCount
            );

        const data =
            response?.data ??
            response ??
            {};

        yield put(
            fetchUnreadCountSuccess(
                data
            )
        );
    } catch (error) {
        yield put(
            fetchUnreadCountFailure(
                getErrorMessage(error)
            )
        );
    }
}

/**
 * Mark one notification as read.
 */
function* markNotificationAsReadWorker(
    action
) {
    try {
        const id =
            action.payload;

        yield call(
            notificationAPI.markAsRead,
            id
        );

        yield put(
            markNotificationAsReadSuccess(
                id
            )
        );
    } catch (error) {
        yield put(
            markNotificationAsReadFailure(
                getErrorMessage(error)
            )
        );
    }
}

/**
 * Mark all notifications as read.
 */
function* markAllNotificationsAsReadWorker() {
    try {
        yield call(
            notificationAPI.markAllAsRead
        );

        yield put(
            markAllNotificationsAsReadSuccess()
        );
    } catch (error) {
        yield put(
            markAllNotificationsAsReadFailure(
                getErrorMessage(error)
            )
        );
    }
}

export default function* notificationSaga() {
    yield takeLatest(
        fetchNotificationsRequest.type,
        fetchNotificationsWorker
    );

    yield takeLatest(
        fetchUnreadNotificationsRequest.type,
        fetchUnreadNotificationsWorker
    );

    yield takeLatest(
        fetchUnreadCountRequest.type,
        fetchUnreadCountWorker
    );

    yield takeLatest(
        markNotificationAsReadRequest.type,
        markNotificationAsReadWorker
    );

    yield takeLatest(
        markAllNotificationsAsReadRequest.type,
        markAllNotificationsAsReadWorker
    );
}