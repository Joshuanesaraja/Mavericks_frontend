import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";

import {
    getPatients,
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
} from "./patientAPI";

import {
    saveCachedPatients,
    getCachedPatients
} from "../appointments/appointmentOfflineDB";

import {
    getPatientsRequest,
    getPatientsSuccess,
    getPatientsFailure,

    getAllPatientsRequest,
    getAllPatientsSuccess,
    getAllPatientsFailure,

    prefetchPatientsRequest,
    prefetchPatientsSuccess,
    prefetchPatientsFailure,

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


function* handleGetAllPatients() {
    const isOnline =
        typeof navigator === "undefined"
            ? true
            : navigator.onLine;

    if (!isOnline) {
        try {
            const cachedPatients =
                yield call(
                    getCachedPatients
                );

            if (cachedPatients.length > 0) {
                yield put(
                    getAllPatientsSuccess(
                        cachedPatients
                    )
                );

                return;
            }

            yield put(
                getAllPatientsFailure(
                    "No cached patients available while offline."
                )
            );
        } catch (error) {
            yield put(
                getAllPatientsFailure(
                    "Unable to load patients offline."
                )
            );
        }

        return;
    }

    try {
        const response =
            yield call(getAllPatients);

        const data =
            getResponseData(response);

        const patients =
            Array.isArray(data)
                ? data
                : data?.patients || [];

        try {
            yield call(
                saveCachedPatients,
                patients
            );
        } catch (cacheError) {
            // Cache failure should not block the online response.
        }

        yield put(
            getAllPatientsSuccess(
                patients
            )
        );
    } catch (error) {
        const isNetworkFailure =
            !error?.response &&
            (
                error?.code === "ERR_NETWORK" ||
                error?.code === "ECONNABORTED"
            );

        if (isNetworkFailure) {
            try {
                const cachedPatients =
                    yield call(
                        getCachedPatients
                    );

                if (cachedPatients.length > 0) {
                    yield put(
                        getAllPatientsSuccess(
                            cachedPatients
                        )
                    );

                    return;
                }
            } catch (cacheError) {
                // Fall through to normal error handling.
            }
        }

        yield put(
            getAllPatientsFailure(
                getErrorMessage(error)
            )
        );
    }
}

function getErrorMessage(error) {
    return (
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred."
    );
}

function getResponseData(response) {
    return (
        response?.data?.data ||
        response?.data
    );
}

/*
 * =========================================================
 * INITIAL / NORMAL PATIENT FETCH
 * =========================================================
 */

function* handleGetPatients(action) {
    const page =
        Number(
            action.payload?.page
        ) || 1;

    const limit =
        Number(
            action.payload?.limit
        ) || 10;

    try {
        const response =
            yield call(
                getPatients,
                {
                    page,
                    limit
                }
            );

        const data =
            getResponseData(response);

        yield put(
            getPatientsSuccess(data)
        );
    } catch (error) {
        yield put(
            getPatientsFailure(
                getErrorMessage(error)
            )
        );
    }
}

/*
 * =========================================================
 * BACKGROUND PREFETCH
 * =========================================================
 */

function* handlePrefetchPatients(
    action
) {
    const page =
        Number(
            action.payload?.page
        ) || 1;

    const limit =
        Number(
            action.payload?.limit
        ) || 10;

    try {
        const response =
            yield call(
                getPatients,
                {
                    page,
                    limit
                }
            );

        const data =
            getResponseData(response);

        yield put(
            prefetchPatientsSuccess(
                data
            )
        );
    } catch (error) {
        yield put(
            prefetchPatientsFailure({
                page,

                message:
                    getErrorMessage(
                        error
                    )
            })
        );
    }
}

/*
 * =========================================================
 * GET ONE PATIENT
 * =========================================================
 */

function* handleGetPatient(action) {
    try {
        const response =
            yield call(
                getPatientById,
                action.payload
            );

        const data =
            getResponseData(response);

        yield put(
            getPatientSuccess(data)
        );
    } catch (error) {
        yield put(
            getPatientFailure(
                getErrorMessage(error)
            )
        );
    }
}

/*
 * =========================================================
 * CREATE
 * =========================================================
 */

function* handleCreatePatient(action) {
    try {
        const response = yield call(
            createPatient,
            action.payload
        );

        const data = getResponseData(response);

        yield put(
            createPatientSuccess(data)
        );
    } catch (error) {
        yield put(
            createPatientFailure(
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

function* handleUpdatePatient(action) {
    try {
        const {
            id,
            patientData
        } = action.payload;

        const response =
            yield call(
                updatePatient,
                id,
                patientData
            );

        const data =
            getResponseData(response);

        yield put(
            updatePatientSuccess(data)
        );
    } catch (error) {
        yield put(
            updatePatientFailure(
                getErrorMessage(error)
            )
        );
    }
}

/*
 * =========================================================
 * DELETE
 * =========================================================
 */

function* handleDeletePatient(action) {
    try {
        yield call(
            deletePatient,
            action.payload
        );

        yield put(
            deletePatientSuccess(
                action.payload
            )
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
        prefetchPatientsRequest.type,
        handlePrefetchPatients
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

    yield takeLatest(
        getAllPatientsRequest.type,
        handleGetAllPatients
    );
}