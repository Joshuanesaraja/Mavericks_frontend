import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prescriptions: [],
    selectedPrescription: null,
    loading: false,
    error: null
};

const prescriptionSlice = createSlice({
    name: "prescriptions",
    initialState,

    reducers: {
        getPrescriptionsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getPrescriptionsSuccess: (state, action) => {
            state.loading = false;
            state.prescriptions = action.payload;
            state.error = null;
        },

        getPrescriptionsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getPrescriptionRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getPrescriptionSuccess: (state, action) => {
            state.loading = false;
            state.selectedPrescription = action.payload;
            state.error = null;
        },

        getPrescriptionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        createPrescriptionRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        createPrescriptionSuccess: (state, action) => {
            state.loading = false;
            state.prescriptions.push(action.payload);
            state.error = null;
        },

        createPrescriptionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updatePrescriptionStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        updatePrescriptionStatusSuccess: (state, action) => {
            state.loading = false;

            const index = state.prescriptions.findIndex(
                (prescription) =>
                    prescription.id === action.payload.id
            );

            if (index !== -1) {
                state.prescriptions[index] = action.payload;
            }

            state.selectedPrescription = action.payload;
            state.error = null;
        },

        updatePrescriptionStatusFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearPrescriptionError: (state) => {
            state.error = null;
        }
    }
});

export const {
    getPrescriptionsRequest,
    getPrescriptionsSuccess,
    getPrescriptionsFailure,
    getPrescriptionRequest,
    getPrescriptionSuccess,
    getPrescriptionFailure,
    createPrescriptionRequest,
    createPrescriptionSuccess,
    createPrescriptionFailure,
    updatePrescriptionStatusRequest,
    updatePrescriptionStatusSuccess,
    updatePrescriptionStatusFailure,
    clearPrescriptionError
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;