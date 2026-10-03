import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patients: [],
    selectedPatient: null,
    loading: false,
    error: null
};

const patientSlice = createSlice({
    name: "patients",
    initialState,

    reducers: {
        getPatientsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getPatientsSuccess: (state, action) => {
            state.loading = false;
            state.patients = action.payload;
            state.error = null;
        },

        getPatientsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getPatientRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getPatientSuccess: (state, action) => {
            state.loading = false;
            state.selectedPatient = action.payload;
            state.error = null;
        },

        getPatientFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        createPatientRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        createPatientSuccess: (state, action) => {
            state.loading = false;
            state.patients.push(action.payload);
            state.error = null;
        },

        createPatientFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updatePatientRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        updatePatientSuccess: (state, action) => {
            state.loading = false;

            const index = state.patients.findIndex(
                (patient) => patient.id === action.payload.id
            );

            if (index !== -1) {
                state.patients[index] = action.payload;
            }

            state.selectedPatient = action.payload;
            state.error = null;
        },

        updatePatientFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deletePatientRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        deletePatientSuccess: (state, action) => {
            state.loading = false;

            state.patients = state.patients.filter(
                (patient) => patient.id !== action.payload
            );

            if (state.selectedPatient?.id === action.payload) {
                state.selectedPatient = null;
            }

            state.error = null;
        },

        deletePatientFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearPatientError: (state) => {
            state.error = null;
        }
    }
});

export const {
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
    deletePatientFailure,
    clearPatientError
} = patientSlice.actions;

export default patientSlice.reducer;