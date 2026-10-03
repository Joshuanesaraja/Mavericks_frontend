import { all } from "redux-saga/effects";

import authSaga from "../modules/auth/authSaga";
import patientSaga from "../modules/patients/patientSaga";
import prescriptionSaga from "../modules/prescriptions/prescriptionSaga";
import userSaga from "../modules/users/userSaga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        patientSaga(),
        prescriptionSaga(),
        userSaga()
    ]);
}