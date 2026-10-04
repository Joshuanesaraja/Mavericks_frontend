import {
  call,
  put,
  takeLatest,
} from "redux-saga/effects";

import settingsAPI from "./settingsAPI";

import {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,

  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} from "./settingsSlice";

const getClient = () => {
  if (!globalThis.__MAVERICKS_API_CLIENT__) {
    throw new Error(
      "Mavericks API client is not connected yet."
    );
  }

  return globalThis.__MAVERICKS_API_CLIENT__;
};

const errorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Settings request failed";

function* fetchProfileWorker() {
  try {
    const response = yield call(
      settingsAPI.getProfile,
      getClient()
    );

    yield put(
      fetchProfileSuccess(response)
    );
  } catch (error) {
    yield put(
      fetchProfileFailure(
        errorMessage(error)
      )
    );
  }
}

function* changePasswordWorker(action) {
  try {
    const response = yield call(
      settingsAPI.changePassword,
      getClient(),
      action.payload
    );

    yield put(
      changePasswordSuccess(response)
    );
  } catch (error) {
    yield put(
      changePasswordFailure(
        errorMessage(error)
      )
    );
  }
}

export default function* settingsSaga() {
  yield takeLatest(
    fetchProfileRequest.type,
    fetchProfileWorker
  );

  yield takeLatest(
    changePasswordRequest.type,
    changePasswordWorker
  );
}