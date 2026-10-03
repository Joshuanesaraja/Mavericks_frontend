import apiService from "../../services/apiService";

export function getUsers() {
    return apiService.get("/users");
}

export function getUserById(id) {
    return apiService.get(`/users/${id}`);
}

export function createUser(userData) {
    return apiService.post(
        "/users",
        userData
    );
}

export function updateUser(id, userData) {
    return apiService.put(
        `/users/${id}`,
        userData
    );
}

export function assignUserRole(id, roleData) {
    return apiService.put(
        `/users/${id}/role`,
        roleData
    );
}

export function updateUserStatus(id, statusData) {
    return apiService.put(
        `/users/${id}/status`,
        statusData
    );
}