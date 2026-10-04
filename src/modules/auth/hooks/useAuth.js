import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    loginRequest,
    getProfileRequest,
    logoutRequest,
    changePasswordRequest,
    clearAuthError
} from "../authSlice";

import {
    selectCurrentUser,
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError,
    selectAuthInitialized
} from "../selectors";

export function useAuth() {
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const initialized = useSelector(selectAuthInitialized);

    const login = useCallback(
        (credentials) => dispatch(loginRequest(credentials)),
        [dispatch]
    );

    const loadProfile = useCallback(
        () => dispatch(getProfileRequest()),
        [dispatch]
    );

    const logout = useCallback(
        () => dispatch(logoutRequest()),
        [dispatch]
    );

    const changePassword = useCallback(
        (passwordData) =>
            dispatch(changePasswordRequest(passwordData)),
        [dispatch]
    );

    const clearError = useCallback(
        () => dispatch(clearAuthError()),
        [dispatch]
    );

    return {
        user,
        isAuthenticated,
        loading,
        error,
        initialized,
        login,
        loadProfile,
        logout,
        changePassword,
        clearError
    };
}