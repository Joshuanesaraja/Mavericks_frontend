import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    initialized: false,
    registration: null,
    csrfLoading: false,
    csrfError: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            state.initialized = true;
        },

        loginFailure: (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.initialized = true;
        },

        registerRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        registerSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.registration = action.payload;
        },

        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getProfileRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            state.initialized = true;
        },

        getProfileFailure: (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.initialized = true;
        },

        logoutRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.initialized = true;
        },

        logoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        changePasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        changePasswordSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },

        changePasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        initializeCsrfRequest: (state) => {
            state.csrfLoading = true;
            state.csrfError = null;
        },

        initializeCsrfSuccess: (state) => {
            state.csrfLoading = false;
            state.csrfError = null;
        },

        initializeCsrfFailure: (state, action) => {
            state.csrfLoading = false;
            state.csrfError = action.payload;
        },

        clearAuthError: (state) => {
            state.error = null;
        }
    }
});

export const {
    loginRequest,
    initializeCsrfRequest,
    initializeCsrfSuccess,
    initializeCsrfFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    loginSuccess,
    loginFailure,
    getProfileRequest,
    getProfileSuccess,
    getProfileFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,
    clearAuthError
} = authSlice.actions;

export default authSlice.reducer;