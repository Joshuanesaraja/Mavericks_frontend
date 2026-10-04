import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    initialized: false
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

        clearAuthError: (state) => {
            state.error = null;
        }
    }
});

export const {
    loginRequest,
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