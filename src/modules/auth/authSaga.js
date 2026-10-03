import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";

import {
    getCsrfToken,
    login,
    getProfile,
    logout,
    changePassword
} from "./authAPI";

import {
    loginRequest,
    loginSuccess,
    loginFailure,
    getProfileRequest,
    getProfileSuccess,
    getProfileFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure
} from "./authSlice";

import { setCsrfToken } from "../../services/axiosClient";

function getErrorMessage(error) {
    return (
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred."
    );
}

function* handleGetCsrfToken() {
    try {
        const response = yield call(getCsrfToken);

        const token =
            response?.data?.data?.csrf_token ||
            response?.data?.csrf_token;

        if (token) {
            setCsrfToken(token);
        }
    } catch (error) {
        console.error("CSRF token request failed:", error);
    }
}

function* handleLogin(action) {
    try {
        yield call(handleGetCsrfToken);

        const response = yield call(
            login,
            action.payload
        );

        const data =
            response?.data?.data ||
            response?.data;

        if (data?.csrf_token) {
            setCsrfToken(data.csrf_token);
        }

        yield put(loginSuccess(data));
    } catch (error) {
        yield put(
            loginFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleGetProfile() {
    try {
        yield call(handleGetCsrfToken);

        const response = yield call(getProfile);

        const data =
            response?.data?.data ||
            response?.data;

        yield put(getProfileSuccess(data));
    } catch (error) {
        if (error?.response?.status === 401) {
            yield put(getProfileFailure(null));
            return;
        }

        yield put(
            getProfileFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleLogout() {
    try {
        yield call(logout);

        yield put(logoutSuccess());

        yield call(handleGetCsrfToken);
    } catch (error) {
        yield put(
            logoutFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* handleChangePassword(action) {
    try {
        const response = yield call(
            changePassword,
            action.payload
        );

        const data =
            response?.data?.data ||
            response?.data;

        yield put(
            changePasswordSuccess(data)
        );
    } catch (error) {
        yield put(
            changePasswordFailure(
                getErrorMessage(error)
            )
        );
    }
}

export default function* authSaga() {
    yield takeLatest(
        loginRequest.type,
        handleLogin
    );

    yield takeLatest(
        getProfileRequest.type,
        handleGetProfile
    );

    yield takeLatest(
        logoutRequest.type,
        handleLogout
    );

    yield takeLatest(
        changePasswordRequest.type,
        handleChangePassword
    );
}