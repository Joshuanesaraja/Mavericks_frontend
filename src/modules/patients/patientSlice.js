import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patients: [],

    selectedPatient: null,

    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        hasMore: false
    },

    /*
     * Stores every 10-patient batch that has already
     * been fetched.
     *
     * Example:
     *
     * loadedBatches: {
     *     1: { patients: [...], pagination: {...} },
     *     2: { patients: [...], pagination: {...} },
     *     3: { patients: [...], pagination: {...} }
     * }
     */
    loadedBatches: {},

    loading: false,

    /*
     * Separate loading state for background prefetching.
     *
     * IMPORTANT:
     * This must NOT replace the normal loading state.
     * Therefore the existing 5 visible patients remain
     * visible while this is true.
     */
    prefetchLoading: false,
    prefetchPage: null,
    prefetchError: null,

    error: null,

    allPatients: [],
    allPatientsLoading: false,
    allPatientsError: null
};

const normalizePagination = (
    pagination = {},
    fallbackPage = 1
) => ({
    page:
        Number(pagination.page) ||
        fallbackPage,

    limit:
        Number(pagination.limit) ||
        10,

    total:
        Number(pagination.total) || 0,

    hasMore:
        Boolean(pagination.has_more)
});

const normalizePatientPage = (
    data,
    fallbackPage = 1
) => {
    return {
        patients:
            Array.isArray(data?.patients)
                ? data.patients
                : [],

        pagination:
            normalizePagination(
                data?.pagination,
                fallbackPage
            )
    };
};

const patientSlice = createSlice({
    name: "patients",

    initialState,

    reducers: {
        getAllPatientsRequest: (state) => {
            state.allPatientsLoading = true;
            state.allPatientsError = null;
        },

        getAllPatientsSuccess: (state, action) => {
            state.allPatientsLoading = false;
            state.allPatients = Array.isArray(action.payload)
                ? action.payload
                : [];
            state.allPatientsError = null;
        },

        getAllPatientsFailure: (state, action) => {
            state.allPatientsLoading = false;
            state.allPatientsError = action.payload;
        },
        /*
         * =========================================================
         * CURRENT PAGE FETCH
         * =========================================================
         */

        getPatientsRequest: (
            state,
            action
        ) => {
            const page =
                Number(
                    action.payload?.page
                ) || 1;

            state.loading = true;
            state.error = null;

            /*
             * A fresh page-1 load means we are starting
             * a fresh patient list session.
             */
            if (page === 1) {
                state.loadedBatches = {};
                state.prefetchLoading = false;
                state.prefetchPage = null;
                state.prefetchError = null;
            }
        },

        getPatientsSuccess: (
            state,
            action
        ) => {
            const page =
                Number(
                    action.payload?.pagination?.page
                ) || 1;

            const batch =
                normalizePatientPage(
                    action.payload,
                    page
                );

            state.loading = false;

            state.patients =
                batch.patients;

            state.pagination =
                batch.pagination;

            /*
             * Cache this 10-patient batch.
             */
            state.loadedBatches[
                batch.pagination.page
            ] = batch;

            state.error = null;
        },

        getPatientsFailure: (
            state,
            action
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        /*
         * =========================================================
         * BACKGROUND PREFETCH
         * =========================================================
         */

        prefetchPatientsRequest: (
            state,
            action
        ) => {
            const page =
                Number(
                    action.payload?.page
                ) || 1;

            /*
             * Don't show this as normal loading.
             *
             * The current 10 patients must stay visible.
             */
            state.prefetchLoading = true;
            state.prefetchPage = page;
            state.prefetchError = null;
        },

        prefetchPatientsSuccess: (
            state,
            action
        ) => {
            const page =
                Number(
                    action.payload?.pagination?.page
                ) || 1;

            const batch =
                normalizePatientPage(
                    action.payload,
                    page
                );

            /*
             * Store the next 10 patients.
             *
             * DO NOT replace state.patients here.
             *
             * This is what prevents the background fetch
             * from changing what the user currently sees.
             */
            state.loadedBatches[
                batch.pagination.page
            ] = batch;

            state.prefetchLoading = false;
            state.prefetchPage = null;
            state.prefetchError = null;
        },

        prefetchPatientsFailure: (
            state,
            action
        ) => {
            state.prefetchLoading = false;

            state.prefetchPage = null;

            state.prefetchError = {
                page:
                    Number(
                        action.payload?.page
                    ) || null,

                message:
                    action.payload?.message ||
                    "Unable to load the next patients."
            };
        },

        /*
         * =========================================================
         * USE AN ALREADY FETCHED BATCH
         * =========================================================
         */

        setCurrentPatientsFromBatch: (
            state,
            action
        ) => {
            const page =
                Number(
                    action.payload
                ) || 1;

            const batch =
                state.loadedBatches[page];

            if (!batch) {
                return;
            }

            /*
             * No API call.
             *
             * We simply switch Redux's current patients
             * to the already-prefetched 10.
             */
            state.patients =
                batch.patients;

            state.pagination =
                batch.pagination;

            state.error = null;
        },

        /*
         * =========================================================
         * SINGLE PATIENT
         * =========================================================
         */

        getPatientRequest: (
            state
        ) => {
            state.loading = true;
            state.error = null;
        },

        getPatientSuccess: (
            state,
            action
        ) => {
            state.loading = false;
            state.selectedPatient =
                action.payload;
            state.error = null;
        },

        getPatientFailure: (
            state,
            action
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        /*
         * =========================================================
         * CREATE
         * =========================================================
         */

        createPatientRequest: (
            state
        ) => {
            state.loading = true;
            state.error = null;
        },

        createPatientSuccess: (
            state,
            action
        ) => {
            state.loading = false;

            state.patients.push(
                action.payload
            );

            state.error = null;
        },

        createPatientFailure: (
            state,
            action
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        /*
         * =========================================================
         * UPDATE
         * =========================================================
         */

        updatePatientRequest: (
            state
        ) => {
            state.loading = true;
            state.error = null;
        },

        updatePatientSuccess: (
            state,
            action
        ) => {
            state.loading = false;

            const index =
                state.patients.findIndex(
                    (patient) =>
                        patient.id ===
                        action.payload.id
                );

            if (index !== -1) {
                state.patients[index] =
                    action.payload;
            }

            state.selectedPatient =
                action.payload;

            state.error = null;
        },

        updatePatientFailure: (
            state,
            action
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        /*
         * =========================================================
         * DELETE
         * =========================================================
         */

        deletePatientRequest: (
            state
        ) => {
            state.loading = true;
            state.error = null;
        },

        deletePatientSuccess: (
            state,
            action
        ) => {
            state.loading = false;

            state.patients =
                state.patients.filter(
                    (patient) =>
                        patient.id !==
                        action.payload
                );

            if (
                state.selectedPatient?.id ===
                action.payload
            ) {
                state.selectedPatient =
                    null;
            }

            state.error = null;
        },

        deletePatientFailure: (
            state,
            action
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearPatientError: (
            state
        ) => {
            state.error = null;
        }
    }
});

export const {
    getPatientsRequest,
    getPatientsSuccess,
    getPatientsFailure,

    prefetchPatientsRequest,
    prefetchPatientsSuccess,
    prefetchPatientsFailure,

    setCurrentPatientsFromBatch,

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

    clearPatientError,

    getAllPatientsRequest,
    getAllPatientsSuccess,
    getAllPatientsFailure
} = patientSlice.actions;

export default patientSlice.reducer;