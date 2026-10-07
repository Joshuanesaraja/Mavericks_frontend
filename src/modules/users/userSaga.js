import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    assignUserRole,
    updateUserStatus
} from "./userAPI";

import {
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
    getUserRequest,
    getUserSuccess,
    getUserFailure,
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    assignUserRoleRequest,
    assignUserRoleSuccess,
    assignUserRoleFailure,
    updateUserStatusRequest,
    updateUserStatusSuccess,
    updateUserStatusFailure
} from "./userSlice";

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

function* handleGetUsers() {
    try {
        const response = yield call(getUsers);

        const data = getResponseData(response);

        yield put(
            getUsersSuccess(data)
        );
    } catch (error) {
        yield put(
            getUsersFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleGetUser(action) {
    try {
        const response = yield call(
            getUserById,
            action.payload
        );

        const data = getResponseData(response);

        yield put(
            getUserSuccess(data)
        );
    } catch (error) {
        yield put(
            getUserFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleCreateUser(action) {
    try {
        const response = yield call(
            createUser,
            action.payload
        );

        const data = getResponseData(response);

        yield put(
            createUserSuccess(data)
        );
    } catch (error) {
        yield put(
            createUserFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleUpdateUser(action) {
    try {
        const response = yield call(
            updateUser,
            action.payload.id,
            action.payload.data
        );

        const data = getResponseData(response);

        yield put(
            updateUserSuccess(data)
        );
    } catch (error) {
        yield put(
            updateUserFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleAssignUserRole(action) {
    try {
        const response = yield call(
            assignUserRole,
            action.payload.id,
            action.payload.data
        );

        const data = getResponseData(response);

        yield put(
            assignUserRoleSuccess(data)
        );
    } catch (error) {
        yield put(
            assignUserRoleFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleUpdateUserStatus(action) {
    try {
        const response = yield call(
            updateUserStatus,
            action.payload.id,
            action.payload.data
        );

        const data = getResponseData(response);

        yield put(
            updateUserStatusSuccess(data)
        );
    } catch (error) {
        yield put(
            updateUserStatusFailure(
                getErrorMessage(error)
            )
        );
    }
}

export default function* userSaga() {
    yield takeLatest(
        getUsersRequest.type,
        handleGetUsers
    );

    yield takeLatest(
        getUserRequest.type,
        handleGetUser
    );

    yield takeLatest(
        createUserRequest.type,
        handleCreateUser
    );

    yield takeLatest(
        updateUserRequest.type,
        handleUpdateUser
    );

    yield takeLatest(
        assignUserRoleRequest.type,
        handleAssignUserRole
    );

    yield takeLatest(
        updateUserStatusRequest.type,
        handleUpdateUserStatus
    );
}