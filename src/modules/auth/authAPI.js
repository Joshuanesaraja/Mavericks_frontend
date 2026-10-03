import apiService from "../../services/apiService";

export function getCsrfToken() {
    return apiService.get("/csrf-token");
}

export function login(credentials) {
    return apiService.post("/login", credentials);
}

export function register(registrationData) {
    return apiService.post("/register", registrationData);
}

export function refreshToken() {
    return apiService.post("/refresh");
}

export function logout() {
    return apiService.post("/logout");
}

export function getProfile() {
    return apiService.get("/profile");
}

export function changePassword(passwordData) {
    return apiService.post("/change-password", passwordData);
}