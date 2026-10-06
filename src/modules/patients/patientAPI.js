import apiService from "../../services/apiService";

export function getPatients({
    page = 1,
    limit = 10
} = {}) {
    return apiService.get("/patients", {
        params: {
            page,
            limit
        }
    });
}

export function getPatientById(id) {
    return apiService.get(`/patients/${id}`);
}

export function createPatient(patientData) {
    return apiService.post("/patients", patientData);
}

export function updatePatient(id, patientData) {
    return apiService.put(`/patients/${id}`, patientData);
}

export function deletePatient(id) {
    return apiService.delete(`/patients/${id}`);
}