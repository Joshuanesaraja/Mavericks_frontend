import apiService from "../../services/apiService";

export function getPrescriptions() {
    return apiService.get("/prescriptions");
}

export function getPrescriptionDetails(id) {
    return apiService.get(
        `/prescriptions/detail?id=${id}`
    );
}

export function createPrescription(prescriptionData) {
    return apiService.post(
        "/prescriptions",
        prescriptionData
    );
}

export function updatePrescriptionStatus(statusData) {
    return apiService.put(
        "/prescriptions/status",
        statusData
    );
}