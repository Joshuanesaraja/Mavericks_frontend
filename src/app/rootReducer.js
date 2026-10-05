import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../modules/auth/authSlice";
import patientReducer from "../modules/patients/patientSlice";
import prescriptionReducer from "../modules/prescriptions/prescriptionSlice";
import userReducer from "../modules/users/userSlice";
import appointmentReducer from "../modules/appointments/appointmentSlice";
import chatReducer from "../modules/chat/chatSlice";
import staffReducer from "../modules/staff/staffSlice";
import calendarReducer from "../modules/calendar/calendarSlice";
import billingReducer from "../modules/billing/billingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    patients: patientReducer,
    prescriptions: prescriptionReducer,
    users: userReducer,
    appointments: appointmentReducer,
    chat: chatReducer,
    staff: staffReducer,
    calendar: calendarReducer,
    billing: billingReducer
});

export default rootReducer;