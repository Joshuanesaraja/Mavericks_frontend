import { all } from "redux-saga/effects";

import authSaga from "../modules/auth/authSaga";
import patientSaga from "../modules/patients/patientSaga";
import prescriptionSaga from "../modules/prescriptions/prescriptionSaga";
import userSaga from "../modules/users/userSaga";
import appointmentSaga from "../modules/appointments/appointmentSaga";
import chatSaga from "../modules/chat/chatSaga";
import staffSaga from "../modules/staff/staffSaga";
import calendarSaga from "../modules/calendar/calendarSaga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        patientSaga(),
        prescriptionSaga(),
        userSaga(),
        appointmentSaga(),
        chatSaga(),
        staffSaga(),
        calendarSaga()
    ]);
}