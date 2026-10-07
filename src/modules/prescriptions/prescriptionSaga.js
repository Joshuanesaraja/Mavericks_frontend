import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";

import {
    getPrescriptions,
    getPrescriptionDetails,
    createPrescription,
    updatePrescriptionStatus
} from "./prescriptionAPI";

import {
    getPrescriptionsRequest,
    getPrescriptionsSuccess,
    getPrescriptionsFailure,
    getPrescriptionRequest,
    getPrescriptionSuccess,
    getPrescriptionFailure,
    createPrescriptionRequest,
    createPrescriptionSuccess,
    createPrescriptionFailure,
    updatePrescriptionStatusRequest,
    updatePrescriptionStatusSuccess,
    updatePrescriptionStatusFailure
} from "./prescriptionSlice";

function getErrorMessage(error) {
    return (
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred."
    );
}

function getResponseData(response) {
    return response?.data?.data || response?.data;
}

function* handleGetPrescriptions() {
    try {
        const response = yield call(
            getPrescriptions
        );

        const data = getResponseData(response);

        yield put(
            getPrescriptionsSuccess(data)
        );
    } catch (error) {
        yield put(
            getPrescriptionsFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleGetPrescription(action) {
    try {
        const response = yield call(
            getPrescriptionDetails,
            action.payload
        );

        const data = getResponseData(response);

        yield put(
            getPrescriptionSuccess(data)
        );
    } catch (error) {
        yield put(
            getPrescriptionFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleCreatePrescription(action) {
    try {
        const response = yield call(
            createPrescription,
            action.payload
        );

        const data = getResponseData(response);

        yield put(
            createPrescriptionSuccess(data)
        );
    } catch (error) {
        yield put(
            createPrescriptionFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleUpdatePrescriptionStatus(action) {
    try {
        const response = yield call(
            updatePrescriptionStatus,
            action.payload
        );

        const data = getResponseData(response);

        yield put(
            updatePrescriptionStatusSuccess(data)
        );
    } catch (error) {
        yield put(
            updatePrescriptionStatusFailure(
                getErrorMessage(error)
            )
        );
    }
}

export default function* prescriptionSaga() {
    yield takeLatest(
        getPrescriptionsRequest.type,
        handleGetPrescriptions
    );

    yield takeLatest(
        getPrescriptionRequest.type,
        handleGetPrescription
    );

    yield takeLatest(
        createPrescriptionRequest.type,
        handleCreatePrescription
    );

    yield takeLatest(
        updatePrescriptionStatusRequest.type,
        handleUpdatePrescriptionStatus
    );
}