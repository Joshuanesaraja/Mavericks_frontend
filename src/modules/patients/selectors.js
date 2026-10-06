export const selectPatients = (state) =>
    state.patients.patients;

export const selectSelectedPatient = (state) =>
    state.patients.selectedPatient;

export const selectPatientLoading = (state) =>
    state.patients.loading;

export const selectPatientError = (state) =>
    state.patients.error;

export const selectPatientPagination = (
    state
) =>
    state.patients.pagination;

export const selectPatientLoadedBatches = (
    state
) =>
    state.patients.loadedBatches;

export const selectPatientPrefetchLoading = (
    state
) =>
    state.patients.prefetchLoading;

export const selectPatientPrefetchError = (
    state
) =>
    state.patients.prefetchError;