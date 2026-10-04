import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";

import appointmentAPI from "./appointmentAPI";

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
    createAppointmentSuccess,
    createAppointmentFailure,

    updateAppointmentRequest,
    updateAppointmentSuccess,
    updateAppointmentFailure,

    cancelAppointmentRequest,
    cancelAppointmentSuccess,
    cancelAppointmentFailure,

    updateAppointmentStatusRequest,
    updateAppointmentStatusSuccess,
    updateAppointmentStatusFailure
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
    const envelope = response?.data;

    return {
        data: envelope?.data ?? envelope,
        message: envelope?.message
    };
}

function* fetchAppointmentsWorker(action) {
    try {
        const response = yield call(
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
    try {
        const response = yield call(
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

function* fetchAppointmentWorker(action) {
    try {
        const response = yield call(
            appointmentAPI.getById,
            action.payload
        );

        yield put(
            fetchAppointmentSuccess(
                getResponseData(response)
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

function* createAppointmentWorker(action) {
    try {
        const response = yield call(
            appointmentAPI.create,
            action.payload
        );

        yield put(
            createAppointmentSuccess(
                getResponseData(response)
            )
        );
    } catch (error) {
        yield put(
            createAppointmentFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* updateAppointmentWorker(action) {
    try {
        const response = yield call(
            appointmentAPI.update,
            action.payload
        );

        yield put(
            updateAppointmentSuccess(
                getResponseData(response)
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

function* cancelAppointmentWorker(action) {
    try {
        const {
            id,
            reason = ""
        } = action.payload || {};

        const response = yield call(
            appointmentAPI.cancel,
            id,
            reason
        );

        yield put(
            cancelAppointmentSuccess(
                getResponseData(response)
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

function* updateAppointmentStatusWorker(action) {
    try {
        const {
            id,
            status
        } = action.payload || {};

        const response = yield call(
            appointmentAPI.updateStatus,
            id,
            status
        );

        yield put(
            updateAppointmentStatusSuccess(
                getResponseData(response)
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
        fetchAppointmentRequest.type,
        fetchAppointmentWorker
    );

    yield takeLatest(
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
}