import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";

import staffAPI from "./staffAPI";

import {
    fetchStaffRequest,
    fetchStaffSuccess,
    fetchStaffFailure,

    fetchStaffMemberRequest,
    fetchStaffMemberSuccess,
    fetchStaffMemberFailure,

    createStaffRequest,
    createStaffSuccess,
    createStaffFailure,

    updateStaffRequest,
    updateStaffSuccess,
    updateStaffFailure,

    updateStaffStatusRequest,
    updateStaffStatusSuccess,
    updateStaffStatusFailure,

    deleteStaffRequest,
    deleteStaffSuccess,
    deleteStaffFailure
} from "./staffSlice";

function getErrorMessage(error) {
    return (
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred."
    );
}

function getResponseData(response) {
    return (
        response?.data?.data ??
        response?.data
    );
}

function* handleFetchStaff() {
    try {
        const response =
            yield call(
                staffAPI.getAll
            );

        const data =
            getResponseData(response);

        yield put(
            fetchStaffSuccess(
                Array.isArray(data)
                    ? data
                    : []
            )
        );
    } catch (error) {
        yield put(
            fetchStaffFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleFetchStaffMember(action) {
    try {
        const response =
            yield call(
                staffAPI.getById,
                action.payload
            );

        const data =
            getResponseData(response);

        yield put(
            fetchStaffMemberSuccess(
                data
            )
        );
    } catch (error) {
        yield put(
            fetchStaffMemberFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleCreateStaff(action) {
    try {
        const response =
            yield call(
                staffAPI.create,
                action.payload
            );

        const data =
            getResponseData(response);

        yield put(
            createStaffSuccess({
                data,
                message:
                    response?.data?.message ||
                    "Staff created successfully"
            })
        );
    } catch (error) {
        yield put(
            createStaffFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleUpdateStaff(action) {
    try {
        const {
            id,
            staff
        } = action.payload;

        const response =
            yield call(
                staffAPI.update,
                id,
                staff
            );

        const data =
            getResponseData(response);

        yield put(
            updateStaffSuccess({
                data,
                message:
                    response?.data?.message ||
                    "Staff updated successfully"
            })
        );
    } catch (error) {
        yield put(
            updateStaffFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleUpdateStaffStatus(action) {
    try {
        const {
            id,
            status
        } = action.payload;

        const response =
            yield call(
                staffAPI.updateStatus,
                id,
                status
            );

        const data =
            getResponseData(response);

        yield put(
            updateStaffStatusSuccess({
                data,
                message:
                    response?.data?.message ||
                    "Staff status updated successfully"
            })
        );
    } catch (error) {
        yield put(
            updateStaffStatusFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleDeleteStaff(action) {
    try {
        yield call(
            staffAPI.remove,
            action.payload
        );

        yield put(
            deleteStaffSuccess({
                id: action.payload,
                message:
                    "Staff deleted successfully"
            })
        );
    } catch (error) {
        yield put(
            deleteStaffFailure(
                getErrorMessage(error)
            )
        );
    }
}

export default function* staffSaga() {
    yield takeLatest(
        fetchStaffRequest.type,
        handleFetchStaff
    );

    yield takeLatest(
        fetchStaffMemberRequest.type,
        handleFetchStaffMember
    );

    yield takeLatest(
        createStaffRequest.type,
        handleCreateStaff
    );

    yield takeLatest(
        updateStaffRequest.type,
        handleUpdateStaff
    );

    yield takeLatest(
        updateStaffStatusRequest.type,
        handleUpdateStaffStatus
    );

    yield takeLatest(
        deleteStaffRequest.type,
        handleDeleteStaff
    );
}