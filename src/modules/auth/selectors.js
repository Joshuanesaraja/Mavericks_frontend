export const selectAuth = (state) => state.auth;

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) =>
    state.auth.isAuthenticated;

export const selectAuthLoading = (state) =>
    state.auth.loading;

export const selectAuthError = (state) =>
    state.auth.error;

export const selectAuthInitialized = (state) =>
    state.auth.initialized;

export const selectRegistration = (state) =>
    state.auth.registration;