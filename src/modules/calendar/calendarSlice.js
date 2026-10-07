import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    appointments: [],
    range: null,

    providers: [],
    availability: [],

    loading: false,
    providersLoading: false,
    availabilityLoading: false,
    rescheduling: false,

    error: null,
    providersError: null,
    availabilityError: null,

    successMessage: null
};

function extractData(
    response
) {
    return (
        response?.data?.data ||
        response?.data ||
        {}
    );
}

function extractAppointments(
    response
) {
    const data =
        extractData(response);

    if (
        Array.isArray(data)
    ) {
        return data;
    }

    if (
        Array.isArray(
            data?.appointments
        )
    ) {
        return data.appointments;
    }

    return [];
}

function extractRange(
    response
) {
    const data =
        extractData(response);

    return data?.range || null;
}

function extractAvailability(
    response
) {
    const data =
        extractData(response);

    if (
        Array.isArray(data)
    ) {
        return data;
    }

    if (
        Array.isArray(
            data?.available_slots
        )
    ) {
        return data.available_slots;
    }

    if (
        Array.isArray(
            data?.slots
        )
    ) {
        return data.slots;
    }

    return [];
}

const calendarSlice =
    createSlice({
        name: "calendar",

        initialState,

        reducers: {
            fetchDateRequest(
                state
            ) {
                state.loading =
                    true;

                state.error =
                    null;
            },

            fetchDateSuccess(
                state,
                action
            ) {
                state.loading =
                    false;

                state.appointments =
                    extractAppointments(
                        action.payload
                    );

                state.range =
                    extractRange(
                        action.payload
                    );

                state.error =
                    null;
            },

            fetchDateFailure(
                state,
                action
            ) {
                state.loading =
                    false;

                state.error =
                    action.payload;
            },

            fetchRangeRequest(
                state
            ) {
                state.loading =
                    true;

                state.error =
                    null;
            },

            fetchRangeSuccess(
                state,
                action
            ) {
                state.loading =
                    false;

                state.appointments =
                    extractAppointments(
                        action.payload
                    );

                state.range =
                    extractRange(
                        action.payload
                    );

                state.error =
                    null;
            },

            fetchRangeFailure(
                state,
                action
            ) {
                state.loading =
                    false;

                state.error =
                    action.payload;
            },

            fetchTodayRequest(
                state
            ) {
                state.loading =
                    true;

                state.error =
                    null;
            },

            fetchTodaySuccess(
                state,
                action
            ) {
                state.loading =
                    false;

                state.appointments =
                    extractAppointments(
                        action.payload
                    );

                state.range =
                    extractRange(
                        action.payload
                    );

                state.error =
                    null;
            },

            fetchTodayFailure(
                state,
                action
            ) {
                state.loading =
                    false;

                state.error =
                    action.payload;
            },

            fetchProvidersRequest(
                state
            ) {
                state.providersLoading =
                    true;

                state.providersError =
                    null;
            },

            fetchProvidersSuccess(
                state,
                action
            ) {
                state.providersLoading =
                    false;

                state.providers =
                    Array.isArray(
                        action.payload
                    )
                        ? action.payload
                        : [];

                state.providersError =
                    null;
            },

            fetchProvidersFailure(
                state,
                action
            ) {
                state.providersLoading =
                    false;

                state.providersError =
                    action.payload;
            },

            /*
             * Used for Provider/Nurse/Patient/
             * Pharmacist where /users is not
             * available.
             *
             * Provider names are extracted from
             * calendar appointments.
             */
            mergeProvidersFromAppointments(
                state
            ) {
                const map =
                    new Map(
                        state.providers.map(
                            (provider) => [
                                String(
                                    provider.id
                                ),
                                provider
                            ]
                        )
                    );

                state.appointments.forEach(
                    (appointment) => {
                        if (
                            !appointment.provider_id
                        ) {
                            return;
                        }

                        const id =
                            String(
                                appointment.provider_id
                            );

                        if (
                            !map.has(id)
                        ) {
                            map.set(
                                id,
                                {
                                    id:
                                        appointment.provider_id,

                                    name:
                                        appointment.provider_name ||
                                        `Provider #${appointment.provider_id}`,

                                    email:
                                        appointment.provider_email ||
                                        ""
                                }
                            );
                        }
                    }
                );

                state.providers =
                    Array.from(
                        map.values()
                    );
            },

            fetchAvailabilityRequest(
                state
            ) {
                state.availabilityLoading =
                    true;

                state.availabilityError =
                    null;
            },

            fetchAvailabilitySuccess(
                state,
                action
            ) {
                state.availabilityLoading =
                    false;

                state.availability =
                    extractAvailability(
                        action.payload
                    );

                state.availabilityError =
                    null;
            },

            fetchAvailabilityFailure(
                state,
                action
            ) {
                state.availabilityLoading =
                    false;

                state.availabilityError =
                    action.payload;
            },

            rescheduleAppointmentRequest(
                state
            ) {
                state.rescheduling =
                    true;

                state.error =
                    null;

                state.successMessage =
                    null;
            },

            rescheduleAppointmentSuccess(
                state,
                action
            ) {
                state.rescheduling =
                    false;

                const updated =
                    extractData(
                        action.payload
                    );

                if (
                    updated?.id
                ) {
                    state.appointments =
                        state.appointments.map(
                            (
                                appointment
                            ) =>
                                Number(
                                    appointment.id
                                ) ===
                                Number(
                                    updated.id
                                )
                                    ? updated
                                    : appointment
                        );
                }

                state.successMessage =
                    action.payload
                        ?.data
                        ?.message ||
                    action.payload
                        ?.message ||
                    "Appointment rescheduled successfully";

                state.error =
                    null;
            },

            rescheduleAppointmentFailure(
                state,
                action
            ) {
                state.rescheduling =
                    false;

                state.error =
                    action.payload;
            },

            clearCalendarError(
                state
            ) {
                state.error =
                    null;

                state.providersError =
                    null;

                state.availabilityError =
                    null;
            },

            clearCalendarSuccess(
                state
            ) {
                state.successMessage =
                    null;
            }
        }
    });

export const {
    fetchDateRequest,
    fetchDateSuccess,
    fetchDateFailure,

    fetchRangeRequest,
    fetchRangeSuccess,
    fetchRangeFailure,

    fetchTodayRequest,
    fetchTodaySuccess,
    fetchTodayFailure,

    fetchProvidersRequest,
    fetchProvidersSuccess,
    fetchProvidersFailure,

    mergeProvidersFromAppointments,

    fetchAvailabilityRequest,
    fetchAvailabilitySuccess,
    fetchAvailabilityFailure,

    rescheduleAppointmentRequest,
    rescheduleAppointmentSuccess,
    rescheduleAppointmentFailure,

    clearCalendarError,
    clearCalendarSuccess
} = calendarSlice.actions;

export default calendarSlice.reducer;