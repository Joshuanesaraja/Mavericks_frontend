import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../modules/auth/authSlice";
import patientReducer from "../modules/patients/patientSlice";
import prescriptionReducer from "../modules/prescriptions/prescriptionSlice";
import userReducer from "../modules/users/userSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    patients: patientReducer,
    prescriptions: prescriptionReducer,
    users: userReducer
});

export default rootReducer;