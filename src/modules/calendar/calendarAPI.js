import apiService from "../../services/apiService";

const calendarAPI = {
    getByDate: (date) => {
        return apiService.get(
            "/calendar/date",
            {
                params: {
                    date
                }
            }
        );
    },

    getByRange: (
        startDate,
        endDate
    ) => {
        return apiService.get(
            "/calendar/range",
            {
                params: {
                    start_date: startDate,
                    end_date: endDate
                }
            }
        );
    },

    getToday: () => {
        return apiService.get(
            "/calendar/today"
        );
    },

    getAvailability: ({
        providerId,
        date,
        startTime = "09:00",
        endTime = "17:00",
        slotMinutes = 30
    }) => {
        if (!providerId) {
            throw new Error(
                "Provider is required"
            );
        }

        if (!date) {
            throw new Error(
                "Date is required"
            );
        }

        return apiService.get(
            "/calendar/availability",
            {
                params: {
                    provider_id:
                        providerId,
                    date,
                    start_time:
                        startTime,
                    end_time:
                        endTime,
                    slot_minutes:
                        slotMinutes
                }
            }
        );
    },

    /*
     * /users is Admin-only in the backend.
     *
     * We therefore call this only when the
     * logged-in user is Admin.
     */
    getUsers: () => {
        return apiService.get(
            "/users"
        );
    },

    reschedule: (
        appointment
    ) => {
        if (!appointment?.id) {
            throw new Error(
                "Appointment id is required"
            );
        }

        return apiService.put(
            "/appointments/update",
            {
                id: appointment.id,

                patient_id:
                    appointment.patient_id,

                provider_id:
                    appointment.provider_id,

                start_at:
                    appointment.start_at,

                end_at:
                    appointment.end_at,

                status:
                    appointment.status ||
                    "scheduled",

                reason:
                    appointment.reason ||
                    ""
            }
        );
    }
};

export default calendarAPI;