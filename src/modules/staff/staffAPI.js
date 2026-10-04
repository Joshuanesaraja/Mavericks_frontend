import apiService from "../../services/apiService";

const staffAPI = {
    getAll: () => {
        return apiService.get("/staff");
    },

    getById: (id) => {
        if (!id) {
            throw new Error("Staff id is required");
        }

        return apiService.get(`/staff/${id}`);
    },

    create: (staff) => {
        return apiService.post("/staff", staff);
    },

    update: (id, staff) => {
        if (!id) {
            throw new Error("Staff id is required");
        }

        return apiService.put(
            `/staff/${id}`,
            staff
        );
    },

    updateStatus: (id, status) => {
        if (!id) {
            throw new Error("Staff id is required");
        }

        return apiService.put(
            `/staff/${id}/status`,
            { status }
        );
    },

    remove: (id) => {
        if (!id) {
            throw new Error("Staff id is required");
        }

        return apiService.delete(
            `/staff/${id}`
        );
    }
};

export default staffAPI;