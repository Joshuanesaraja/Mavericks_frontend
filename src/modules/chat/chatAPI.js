import apiService from "../../services/apiService";

const unwrapResponse = (response) => {
    return response?.data ?? response;
};

const chatAPI = {
    getNotes: async (appointmentId) => {
        if (!appointmentId) {
            throw new Error(
                "Appointment ID is required"
            );
        }

        const response =
            await apiService.get(
                "/notes",
                {
                    params: {
                        appointment_id:
                            appointmentId
                    }
                }
            );

        return unwrapResponse(response);
    },

    createNote: async (note) => {
        if (!note?.appointment_id) {
            throw new Error(
                "Appointment ID is required"
            );
        }

        if (
            !note?.content?.trim()
        ) {
            throw new Error(
                "Note content is required"
            );
        }

        const response =
            await apiService.post(
                "/notes/create",
                {
                    appointment_id:
                        Number(
                            note.appointment_id
                        ),

                    content:
                        note.content.trim()
                }
            );

        return unwrapResponse(response);
    },

    getMessageHistory: async (
        appointmentId
    ) => {
        if (!appointmentId) {
            throw new Error(
                "Appointment ID is required"
            );
        }

        const response =
            await apiService.get(
                "/messages/history",
                {
                    params: {
                        appointment_id:
                            appointmentId
                    }
                }
            );

        return unwrapResponse(response);
    },

    sendMessage: async (message) => {
        if (!message?.appointment_id) {
            throw new Error(
                "Appointment ID is required"
            );
        }

        if (
            !message?.content?.trim()
        ) {
            throw new Error(
                "Message content is required"
            );
        }

        const payload = {
            appointment_id:
                Number(
                    message.appointment_id
                ),

            content:
                message.content.trim()
        };

        /*
         * receiver_id is optional.
         *
         * Your backend automatically determines
         * the receiver from the appointment when
         * receiver_id is omitted.
         */

        if (
            message.receiver_id
        ) {
            payload.receiver_id =
                Number(
                    message.receiver_id
                );
        }

        const response =
            await apiService.post(
                "/messages/send",
                payload
            );

        return unwrapResponse(response);
    }
};

export default chatAPI;