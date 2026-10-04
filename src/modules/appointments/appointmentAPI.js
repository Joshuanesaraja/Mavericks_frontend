import apiService from "../../services/apiService";

const appointmentAPI = {
    getAll: (params = {}) => {
        return apiService.get("/appointments", {
            params
        });
    },

    getUpcoming: () => {
        return apiService.get("/appointments/upcoming");
    },

    getById: (id) => {
        if (!id) {
            throw new Error("Appointment id is required");
        }

        return apiService.get("/appointments/detail", {
            params: {
                id
            }
        });
    },

    create: (appointment) => {
        return apiService.post(
            "/appointments/create",
            appointment
        );
    },

    update: (appointment) => {
        if (!appointment?.id) {
            throw new Error("Appointment id is required");
        }

        return apiService.post(
            "/appointments/update",
            appointment
        );
    },

    cancel: (id, reason = "") => {
        if (!id) {
            throw new Error("Appointment id is required");
        }

        return apiService.post(
            "/appointments/cancel",
            {
                id,
                reason
            }
        );
    },

    updateStatus: (id, status) => {
        if (!id || !status) {
            throw new Error(
                "Appointment id and status are required"
            );
        }

        return apiService.post(
            "/appointments/status",
            {
                id,
                status
            }
        );
    }
};

export default appointmentAPI;