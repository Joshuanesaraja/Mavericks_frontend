import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";

import {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
} from "./patientAPI";

import {
    getPatientsRequest,
    getPatientsSuccess,
    getPatientsFailure,
    getPatientRequest,
    getPatientSuccess,
    getPatientFailure,
    createPatientRequest,
    createPatientSuccess,
    createPatientFailure,
    updatePatientRequest,
    updatePatientSuccess,
    updatePatientFailure,
    deletePatientRequest,
    deletePatientSuccess,
    deletePatientFailure
} from "./patientSlice";

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

function* handleGetPatients() {
    try {
        const response = yield call(getPatients);
        const data = getResponseData(response);

        yield put(getPatientsSuccess(data));
    } catch (error) {
        yield put(
            getPatientsFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleGetPatient(action) {
    try {
        const response = yield call(
            getPatientById,
            action.payload
        );

        const data = getResponseData(response);

        yield put(getPatientSuccess(data));
    } catch (error) {
        yield put(
            getPatientFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleCreatePatient(action) {
    try {
        const response = yield call(
            createPatient,
            action.payload
        );

        const data = getResponseData(response);

        yield put(createPatientSuccess(data));
    } catch (error) {
        yield put(
            createPatientFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleUpdatePatient(action) {
    try {
        const { id, patientData } = action.payload;

        const response = yield call(
            updatePatient,
            id,
            patientData
        );

        const data = getResponseData(response);

        yield put(updatePatientSuccess(data));
    } catch (error) {
        yield put(
            updatePatientFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleDeletePatient(action) {
    try {
        yield call(
            deletePatient,
            action.payload
        );

        yield put(
            deletePatientSuccess(action.payload)
        );
    } catch (error) {
        yield put(
            deletePatientFailure(
                getErrorMessage(error)
            )
        );
    }
}

export default function* patientSaga() {
    yield takeLatest(
        getPatientsRequest.type,
        handleGetPatients
    );

    yield takeLatest(
        getPatientRequest.type,
        handleGetPatient
    );

    yield takeLatest(
        createPatientRequest.type,
        handleCreatePatient
    );

    yield takeLatest(
        updatePatientRequest.type,
        handleUpdatePatient
    );

    yield takeLatest(
        deletePatientRequest.type,
        handleDeletePatient
    );
}