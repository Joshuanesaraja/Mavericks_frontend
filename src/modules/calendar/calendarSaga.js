import {
    call,
    put,
    takeLatest,
    select
} from "redux-saga/effects";

import calendarAPI from "./calendarAPI";

import {
    fetchDateRequest,
    fetchDateSuccess,
    fetchDateFailure,

    fetchRangeRequest,
    fetchRangeSuccess,
    fetchRangeFailure,

    fetchTodayRequest,
    fetchTodaySuccess,
    fetchTodayFailure,

    fetchProvidersRequest,
    fetchProvidersSuccess,
    fetchProvidersFailure,

    mergeProvidersFromAppointments,

    fetchAvailabilityRequest,
    fetchAvailabilitySuccess,
    fetchAvailabilityFailure,

    rescheduleAppointmentRequest,
    rescheduleAppointmentSuccess,
    rescheduleAppointmentFailure
} from "./calendarSlice";

import {
    selectCurrentUser
} from "../auth/selectors";

function getErrorMessage(
    error
) {
    return (
        error?.response?.data
            ?.message ||
        error?.message ||
        "Calendar request failed"
    );
}

function getUserRoles(
    user
) {
    if (!user) {
        return [];
    }

    if (
        Array.isArray(user.roles)
    ) {
        return user.roles;
    }

    if (user.role) {
        return [
            user.role
        ];
    }

    return [];
}

function isAdmin(
    user
) {
    return getUserRoles(
        user
    ).some(
        (role) =>
            String(role)
                .toLowerCase() ===
            "admin"
    );
}

function* fetchDateWorker(
    action
) {
    try {
        const response =
            yield call(
                calendarAPI.getByDate,
                action.payload
            );

        yield put(
            fetchDateSuccess(
                response
            )
        );

        /*
         * For non-admin users, provider names
         * are derived from the actual calendar
         * appointments returned by the backend.
         */
        yield put(
            mergeProvidersFromAppointments()
        );
    } catch (error) {
        yield put(
            fetchDateFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* fetchRangeWorker(
    action
) {
    try {
        const {
            startDate,
            endDate
        } = action.payload;

        const response =
            yield call(
                calendarAPI.getByRange,
                startDate,
                endDate
            );

        yield put(
            fetchRangeSuccess(
                response
            )
        );

        yield put(
            mergeProvidersFromAppointments()
        );
    } catch (error) {
        yield put(
            fetchRangeFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* fetchTodayWorker() {
    try {
        const response =
            yield call(
                calendarAPI.getToday
            );

        yield put(
            fetchTodaySuccess(
                response
            )
        );

        yield put(
            mergeProvidersFromAppointments()
        );
    } catch (error) {
        yield put(
            fetchTodayFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* fetchProvidersWorker() {
    try {
        const user =
            yield select(
                selectCurrentUser
            );

        /*
         * /users is Admin-only.
         *
         * For everyone else, providers are
         * populated from calendar appointments.
         */
        if (
            !isAdmin(user)
        ) {
            return;
        }

        const response =
            yield call(
                calendarAPI.getUsers
            );

        const data =
            response?.data?.data ||
            response?.data ||
            [];

        const providers =
            Array.isArray(data)
                ? data
                    .filter(
                        (item) =>
                            Array.isArray(
                                item.roles
                            ) &&
                            item.roles.some(
                                (role) =>
                                    String(
                                        role
                                    )
                                        .toLowerCase() ===
                                    "provider"
                            )
                    )
                    .map(
                        (provider) => ({
                            id:
                                provider.id,

                            name:
                                provider.name ||
                                `Provider #${provider.id}`,

                            email:
                                provider.email ||
                                ""
                        })
                    )
                : [];

        yield put(
            fetchProvidersSuccess(
                providers
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

function* fetchAvailabilityWorker(
    action
) {
    try {
        const response =
            yield call(
                calendarAPI.getAvailability,
                action.payload
            );

        yield put(
            fetchAvailabilitySuccess(
                response
            )
        );
    } catch (error) {
        yield put(
            fetchAvailabilityFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* rescheduleWorker(
    action
) {
    try {
        const response =
            yield call(
                calendarAPI.reschedule,
                action.payload
            );

        yield put(
            rescheduleAppointmentSuccess(
                response
            )
        );
    } catch (error) {
        yield put(
            rescheduleAppointmentFailure(
                getErrorMessage(error)
            )
        );
    }
}

export default function* calendarSaga() {
    yield takeLatest(
        fetchDateRequest.type,
        fetchDateWorker
    );

    yield takeLatest(
        fetchRangeRequest.type,
        fetchRangeWorker
    );

    yield takeLatest(
        fetchTodayRequest.type,
        fetchTodayWorker
    );

    yield takeLatest(
        fetchProvidersRequest.type,
        fetchProvidersWorker
    );

    yield takeLatest(
        fetchAvailabilityRequest.type,
        fetchAvailabilityWorker
    );

    yield takeLatest(
        rescheduleAppointmentRequest.type,
        rescheduleWorker
    );
}