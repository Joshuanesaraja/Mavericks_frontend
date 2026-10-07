import {
    call,
    fork,
    put,
    take,
    takeEvery,
    takeLatest,
    takeLeading,
    delay
} from "redux-saga/effects";

import {
    eventChannel
} from "redux-saga";

import appointmentAPI from "./appointmentAPI";

import {
    addQueuedAppointment,
    getQueuedAppointments,
    removeQueuedAppointment
} from "./appointmentOfflineDB";

import {
    fetchAppointmentsRequest,
    fetchAppointmentsSuccess,
    fetchAppointmentsFailure,

    fetchUpcomingRequest,
    fetchUpcomingSuccess,
    fetchUpcomingFailure,

    fetchAppointmentRequest,
    fetchAppointmentSuccess,
    fetchAppointmentFailure,

    createAppointmentRequest,
    createAppointmentQueued,
    createAppointmentSuccess,
    createAppointmentSynced,
    createAppointmentQueueFailure,
    createAppointmentFailure,

    hydrateQueuedAppointments,
    setOnlineStatus,
    syncQueuedAppointmentsRequest,
    syncQueuedAppointmentsFinished,

    updateAppointmentRequest,
    updateAppointmentSuccess,
    updateAppointmentFailure,

    cancelAppointmentRequest,
    cancelAppointmentSuccess,
    cancelAppointmentFailure,

    updateAppointmentStatusRequest,
    updateAppointmentStatusSuccess,
    updateAppointmentStatusFailure,

    fetchProvidersRequest,
    fetchProvidersSuccess,
    fetchProvidersFailure
} from "./appointmentSlice";

function getErrorMessage(error) {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Appointment request failed."
    );
}

function getResponseData(response) {
    const envelope =
        response?.data;

    return {
        data:
            envelope?.data ??
            envelope,

        message:
            envelope?.message
    };
}

function isNetworkError(error) {
    return (
        typeof navigator !==
            "undefined" &&
        !navigator.onLine
    ) ||
        (
            !error?.response &&
            (
                error?.code ===
                    "ERR_NETWORK" ||
                error?.code ===
                    "ECONNABORTED"
            )
        );
}

/*
 * =========================================================
 * FETCH APPOINTMENTS
 * =========================================================
 */

function* fetchAppointmentsWorker(action) {
    if (
        typeof navigator !== "undefined" &&
        !navigator.onLine
    ) {
        return;
    }

    try {
        const response =
            yield call(
                appointmentAPI.getAll,
                action.payload || {}
            );

        yield put(
            fetchAppointmentsSuccess(
                getResponseData(response)
            )
        );
    } catch (error) {
        yield put(
            fetchAppointmentsFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* fetchUpcomingWorker() {
    if (
        typeof navigator !== "undefined" &&
        !navigator.onLine
    ) {
        return;
    }

    try {
        const response =
            yield call(
                appointmentAPI.getUpcoming
            );

        yield put(
            fetchUpcomingSuccess(
                getResponseData(response)
            )
        );
    } catch (error) {
        yield put(
            fetchUpcomingFailure(
                getErrorMessage(error)
            )
        );
    }
}
/*
 * =========================================================
 * PROVIDERS
 * =========================================================
 */

function* fetchProvidersWorker() {
    if (
        typeof navigator !== "undefined" &&
        !navigator.onLine
    ) {
        return;
    }

    try {
        const response =
            yield call(
                appointmentAPI.getProviders
            );

        yield put(
            fetchProvidersSuccess(
                getResponseData(response)
            )
        );
    } catch (error) {
        yield put(
            fetchProvidersFailure(
                getErrorMessage(error)
            )
        );
    }
}
/*
 * =========================================================
 * SINGLE APPOINTMENT
 * =========================================================
 */

function* fetchAppointmentWorker(
    action
) {
    try {
        const response =
            yield call(
                appointmentAPI.getById,
                action.payload
            );

        yield put(
            fetchAppointmentSuccess(
                getResponseData(
                    response
                )
            )
        );
    } catch (error) {
        yield put(
            fetchAppointmentFailure(
                getErrorMessage(error)
            )
        );
    }
}

/*
 * =========================================================
 * CREATE APPOINTMENT
 * =========================================================
 */

function* createAppointmentWorker(
    action
) {
    const appointment =
        action.payload;

    /*
     * OFFLINE
     *
     * Never call the API.
     * Store the request in IndexedDB.
     */
    if (
        typeof navigator !==
            "undefined" &&
        !navigator.onLine
    ) {
        try {
            const queued =
                yield call(
                    addQueuedAppointment,
                    appointment
                );

            yield put(
                createAppointmentQueued({
                    queueId:
                        queued.id,

                    appointment
                })
            );
        } catch (error) {
            yield put(
                createAppointmentFailure(
                    getErrorMessage(error)
                )
            );
        }

        return;
    }

    /*
     * ONLINE
     *
     * Normal API request.
     */
    try {
        const response =
            yield call(
                appointmentAPI.create,
                appointment
            );

        yield put(
            createAppointmentSuccess(
                getResponseData(
                    response
                )
            )
        );
    } catch (error) {
        /*
         * Connection may have disappeared between
         * navigator.onLine check and API call.
         *
         * Don't lose the appointment.
         */
        if (
            isNetworkError(error)
        ) {
            try {
                const queued =
                    yield call(
                        addQueuedAppointment,
                        appointment
                    );

                yield put(
                    createAppointmentQueued({
                        queueId:
                            queued.id,

                        appointment
                    })
                );
            } catch (queueError) {
                yield put(
                    createAppointmentFailure(
                        getErrorMessage(
                            queueError
                        )
                    )
                );
            }

            return;
        }

        /*
         * Real API error / validation /
         * conflict.
         */
        yield put(
            createAppointmentFailure(
                getErrorMessage(error)
            )
        );
    }
}

/*
 * =========================================================
 * UPDATE
 * =========================================================
 */

function* updateAppointmentWorker(
    action
) {
    try {
        const response =
            yield call(
                appointmentAPI.update,
                action.payload
            );

        yield put(
            updateAppointmentSuccess(
                getResponseData(
                    response
                )
            )
        );
    } catch (error) {
        yield put(
            updateAppointmentFailure(
                getErrorMessage(error)
            )
        );
    }
}

/*
 * =========================================================
 * CANCEL
 * =========================================================
 */

function* cancelAppointmentWorker(
    action
) {
    try {
        const {
            id,
            reason = ""
        } =
            action.payload || {};

        const response =
            yield call(
                appointmentAPI.cancel,
                id,
                reason
            );

        yield put(
            cancelAppointmentSuccess(
                getResponseData(
                    response
                )
            )
        );
    } catch (error) {
        yield put(
            cancelAppointmentFailure(
                getErrorMessage(error)
            )
        );
    }
}

/*
 * =========================================================
 * STATUS
 * =========================================================
 */

function* updateAppointmentStatusWorker(
    action
) {
    try {
        const {
            id,
            status
        } =
            action.payload || {};

        const response =
            yield call(
                appointmentAPI.updateStatus,
                id,
                status
            );

        yield put(
            updateAppointmentStatusSuccess(
                getResponseData(
                    response
                )
            )
        );
    } catch (error) {
        yield put(
            updateAppointmentStatusFailure(
                getErrorMessage(error)
            )
        );
    }
}

/*
 * =========================================================
 * SYNC INDEXEDDB QUEUE
 * =========================================================
 */

function* syncQueuedAppointmentsWorker() {
    if (
        typeof navigator !== "undefined" &&
        !navigator.onLine
    ) {
        yield put(
            syncQueuedAppointmentsFinished()
        );

        return;
    }

    try {
        /*
         * Give the browser a moment to fully
         * restore the network connection.
         */
        yield delay(1500);

        const queuedAppointments =
            yield call(
                getQueuedAppointments
            );

        for (
            const queued
            of queuedAppointments
        ) {
            if (
                typeof navigator !== "undefined" &&
                !navigator.onLine
            ) {
                break;
            }

            let synced = false;

            /*
             * Retry network failures a few times.
             */
            for (
                let attempt = 1;
                attempt <= 3;
                attempt++
            ) {
                try {
                    const response =
                        yield call(
                            appointmentAPI.create,
                            queued.appointment
                        );

                    const responseData =
                        getResponseData(
                            response
                        );

                    /*
                     * API succeeded.
                     * Remove from IndexedDB.
                     */
                    yield call(
                        removeQueuedAppointment,
                        queued.id
                    );

                    /*
                     * Replace temporary Redux
                     * appointment with server appointment.
                     */
                    yield put(
                        createAppointmentSynced({
                            queueId:
                                queued.id,

                            appointment:
                                responseData.data
                        })
                    );

                    synced = true;

                    break;
                } catch (error) {
                    /*
                     * Network error:
                     * keep IndexedDB record
                     * and retry.
                     */
                    if (
                        isNetworkError(error)
                    ) {
                        if (
                            typeof navigator !==
                                "undefined" &&
                            !navigator.onLine
                        ) {
                            break;
                        }

                        if (attempt < 3) {
                            yield delay(2000);
                        }

                        continue;
                    }

                    /*
                     * Real server error
                     * such as validation/conflict.
                     *
                     * Remove it so it doesn't retry forever.
                     */
                    yield call(
                        removeQueuedAppointment,
                        queued.id
                    );

                    yield put(
                        createAppointmentQueueFailure({
                            queueId:
                                queued.id,

                            message:
                                getErrorMessage(
                                    error
                                )
                        })
                    );

                    synced = true;

                    break;
                }
            }

            /*
             * If network failed after all retries,
             * leave the appointment in IndexedDB.
             *
             * It can sync on the next online event
             * or another manual sync.
             */
            if (!synced) {
                break;
            }
        }
    } finally {
        yield put(
            syncQueuedAppointmentsFinished()
        );
    }
}

/*
 * =========================================================
 * BROWSER ONLINE / OFFLINE EVENTS
 * =========================================================
 */

function createNetworkChannel() {
    return eventChannel(
        (emit) => {
            const handleOnline =
                () => emit(true);

            const handleOffline =
                () => emit(false);

            window.addEventListener(
                "online",
                handleOnline
            );

            window.addEventListener(
                "offline",
                handleOffline
            );

            return () => {
                window.removeEventListener(
                    "online",
                    handleOnline
                );

                window.removeEventListener(
                    "offline",
                    handleOffline
                );
            };
        }
    );
}

function* watchNetworkStatus() {
    const channel =
        yield call(
            createNetworkChannel
        );

    try {
        while (true) {
            const isOnline =
                yield take(channel);

            yield put(
                setOnlineStatus(
                    isOnline
                )
            );

            /*
             * Browser just became online.
             *
             * Start queue sync.
             */
            if (isOnline) {
                yield put(
                    syncQueuedAppointmentsRequest()
                );
            }
        }
    } finally {
        channel.close();
    }
}

/*
 * =========================================================
 * RESTORE QUEUE AFTER PAGE RELOAD
 * =========================================================
 */

function* initializeOfflineAppointments() {
    try {
        const queued =
            yield call(
                getQueuedAppointments
            );

        const queuedForRedux =
            queued.map(
                (item) => ({
                    ...item.appointment,

                    id:
                        `offline-${item.id}`,

                    localQueueId:
                        item.id,

                    syncStatus:
                        "pending",

                    status:
                        item.appointment
                            .status ||
                        "scheduled"
                })
            );

        /*
         * Restore IndexedDB queue
         * into Redux.
         */
        yield put(
            hydrateQueuedAppointments(
                queuedForRedux
            )
        );

        const isOnline =
            typeof navigator ===
                "undefined"
                ? true
                : navigator.onLine;

        yield put(
            setOnlineStatus(
                isOnline
            )
        );

        /*
         * If we loaded the application
         * while online and there are old
         * queued appointments, sync them.
         */
        if (
            isOnline &&
            queued.length > 0
        ) {
            yield put(
                syncQueuedAppointmentsRequest()
            );
        }
    } catch (error) {
        yield put(
            createAppointmentFailure(
                "Unable to restore offline appointments."
            )
        );
    }
}

/*
 * =========================================================
 * ROOT APPOINTMENT SAGA
 * =========================================================
 */

export default function* appointmentSaga() {
    yield takeLatest(
        fetchAppointmentsRequest.type,
        fetchAppointmentsWorker
    );

    yield takeLatest(
        fetchUpcomingRequest.type,
        fetchUpcomingWorker
    );

    yield takeLatest(
        fetchProvidersRequest.type,
        fetchProvidersWorker
    );

    yield takeLatest(
        fetchAppointmentRequest.type,
        fetchAppointmentWorker
    );

    /*
     * IMPORTANT:
     *
     * takeEvery instead of takeLatest.
     *
     * If the user creates multiple appointments
     * offline, none of them should cancel another.
     */
    yield takeEvery(
        createAppointmentRequest.type,
        createAppointmentWorker
    );

    yield takeLatest(
        updateAppointmentRequest.type,
        updateAppointmentWorker
    );

    yield takeLatest(
        cancelAppointmentRequest.type,
        cancelAppointmentWorker
    );

    yield takeLatest(
        updateAppointmentStatusRequest.type,
        updateAppointmentStatusWorker
    );

    /*
     * Only one queue-sync process runs at a time.
     */
    yield takeLeading(
        syncQueuedAppointmentsRequest.type,
        syncQueuedAppointmentsWorker
    );

    yield fork(
        watchNetworkStatus
    );

    /*
     * Restore IndexedDB queue when app starts.
     */
    yield call(
        initializeOfflineAppointments
    );
}