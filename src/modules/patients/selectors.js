export const selectPatients = (state) =>
    state.patients.patients;

export const selectSelectedPatient = (state) =>
    state.patients.selectedPatient;

export const selectPatientLoading = (state) =>
    state.patients.loading;

export const selectPatientError = (state) =>
    state.patients.error;