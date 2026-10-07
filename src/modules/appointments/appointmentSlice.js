import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appointments: [],
    upcoming: [],
    selectedAppointment: null,

    loading: false,
    upcomingLoading: false,
    detailLoading: false,

    creating: false,
    updating: false,
    cancelling: false,
    statusUpdating: false,

    providers: [],
    providersLoading: false,
    providersError: null,

    error: null,
    conflict: null,
    successMessage: null,

    isOnline:
        typeof navigator !== "undefined"
            ? navigator.onLine
            : true,

    queuedAppointments: [],

    syncingQueuedAppointments: false
    };

const appointmentSlice = createSlice({
    name: "appointments",

    initialState,

    reducers: {
        fetchAppointmentsRequest(state) {
            state.loading = true;
            state.error = null;
        },

        fetchAppointmentsSuccess(state, action) {
            state.loading = false;
            state.error = null;

            const response = action.payload;

            const data = response?.data;

            const serverAppointments =
                Array.isArray(data)
                    ? data
                    : data?.appointments || [];

            /*
            * Never lose appointments that are waiting
            * in the offline queue.
            */
            state.appointments = [
                ...state.queuedAppointments,
                ...serverAppointments
            ];
        },

        fetchAppointmentsFailure(state, action) {
            state.loading = false;
            state.error =
                action.payload ||
                "Unable to load appointments";
        },

        fetchUpcomingRequest(state) {
            state.upcomingLoading = true;
            state.error = null;
        },

        fetchUpcomingSuccess(state, action) {
            state.upcomingLoading = false;
            state.error = null;

            const response = action.payload;

            const data = response?.data;

            const serverAppointments =
                Array.isArray(data)
                    ? data
                    : data?.appointments || [];

            state.upcoming = [
                ...state.queuedAppointments.filter(
                    (appointment) =>
                        appointment.status !==
                            "cancelled" &&
                        new Date(
                            appointment.start_at
                        ) >= new Date()
                ),

                ...serverAppointments
            ].sort(
                (a, b) =>
                    new Date(a.start_at) -
                    new Date(b.start_at)
            );
        },

        fetchUpcomingFailure(state, action) {
            state.upcomingLoading = false;
            state.error =
                action.payload ||
                "Unable to load upcoming appointments";
        },

        fetchAppointmentRequest(state) {
            state.detailLoading = true;
            state.error = null;
            state.selectedAppointment = null;
        },

        fetchAppointmentSuccess(state, action) {
            state.detailLoading = false;
            state.error = null;

            state.selectedAppointment =
                action.payload?.data || null;
        },

        fetchAppointmentFailure(state, action) {
            state.detailLoading = false;

            state.error =
                action.payload ||
                "Unable to load appointment details";
        },

        createAppointmentRequest(state) {
            state.creating = true;
            state.error = null;
            state.conflict = null;
            state.successMessage = null;
        },

        createAppointmentQueued(
            state,
            action
        ) {
            state.creating = false;
            state.error = null;
            state.conflict = null;

            const {
                queueId,
                appointment
            } = action.payload || {};

            if (
                !queueId ||
                !appointment
            ) {
                return;
            }

            const queuedAppointment = {
                ...appointment,

                /*
                * Temporary browser-only ID.
                */
                id: `offline-${queueId}`,

                localQueueId:
                    queueId,

                syncStatus:
                    "pending",

                status:
                    appointment.status ||
                    "scheduled"
            };

            state.queuedAppointments = [
                ...state.queuedAppointments.filter(
                    (item) =>
                        item.localQueueId !==
                        queueId
                ),

                queuedAppointment
            ];

            state.appointments = [
                queuedAppointment,
                ...state.appointments
            ];

            const upcomingDate =
                new Date(
                    queuedAppointment.start_at
                );

            if (
                queuedAppointment.status !==
                    "cancelled" &&
                !Number.isNaN(
                    upcomingDate.getTime()
                ) &&
                upcomingDate >= new Date()
            ) {
                state.upcoming = [
                    queuedAppointment,
                    ...state.upcoming
                ].sort(
                    (a, b) =>
                        new Date(a.start_at) -
                        new Date(b.start_at)
                );
            }

            state.successMessage =
                "Appointment saved offline. It will be synced automatically when you are online.";
        },

        createAppointmentSynced(
            state,
            action
        ) {
            state.creating = false;
            state.error = null;
            state.conflict = null;

            const {
                queueId,
                appointment
            } = action.payload || {};

            /*
            * Remove from Redux queue.
            */
            state.queuedAppointments =
                state.queuedAppointments.filter(
                    (item) =>
                        item.localQueueId !==
                        queueId
                );

            /*
            * Remove temporary offline appointment.
            */
            state.appointments =
                state.appointments
                    .filter(
                        (item) =>
                            item.localQueueId !==
                            queueId
                    )
                    .filter(
                        (item) =>
                            !appointment?.id ||
                            String(item.id) !==
                                String(
                                    appointment.id
                                )
                    );

            /*
            * Add the real server appointment.
            */
            if (appointment) {
                state.appointments = [
                    appointment,
                    ...state.appointments
                ];

                const upcomingDate =
                    new Date(
                        appointment.start_at
                    );

                if (
                    appointment.status !==
                        "cancelled" &&
                    !Number.isNaN(
                        upcomingDate.getTime()
                    ) &&
                    upcomingDate >= new Date()
                ) {
                    state.upcoming = [
                        appointment,

                        ...state.upcoming.filter(
                            (item) =>
                                item.localQueueId !==
                                    queueId &&
                                (
                                    !appointment.id ||
                                    String(item.id) !==
                                        String(
                                            appointment.id
                                        )
                                )
                        )
                    ].sort(
                        (a, b) =>
                            new Date(a.start_at) -
                            new Date(b.start_at)
                    );
                }
            }

            state.successMessage =
                "Offline appointment synced successfully.";
        },

        createAppointmentQueueFailure(
            state,
            action
        ) {
            state.creating = false;

            const {
                queueId,
                message
            } = action.payload || {};

            state.queuedAppointments =
                state.queuedAppointments.filter(
                    (item) =>
                        item.localQueueId !==
                        queueId
                );

            state.appointments =
                state.appointments.filter(
                    (item) =>
                        item.localQueueId !==
                        queueId
                );

            state.upcoming =
                state.upcoming.filter(
                    (item) =>
                        item.localQueueId !==
                        queueId
                );

            state.error =
                message ||
                "Offline appointment could not be synced.";
        },

        hydrateQueuedAppointments(
            state,
            action
        ) {
            const queued =
                Array.isArray(action.payload)
                    ? action.payload
                    : [];

            state.queuedAppointments =
                queued;

            const queuedIds =
                new Set(
                    queued.map(
                        (appointment) =>
                            appointment.localQueueId
                    )
                );

            state.appointments = [
                ...queued,

                ...state.appointments.filter(
                    (appointment) =>
                        !queuedIds.has(
                            appointment.localQueueId
                        )
                )
            ];

            state.upcoming = [
                ...queued.filter(
                    (appointment) =>
                        appointment.status !==
                            "cancelled" &&
                        new Date(
                            appointment.start_at
                        ) >= new Date()
                ),

                ...state.upcoming.filter(
                    (appointment) =>
                        !queuedIds.has(
                            appointment.localQueueId
                        )
                )
            ].sort(
                (a, b) =>
                    new Date(a.start_at) -
                    new Date(b.start_at)
            );
        },

        setOnlineStatus(
            state,
            action
        ) {
            state.isOnline =
                Boolean(action.payload);
        },

        syncQueuedAppointmentsRequest(
            state
        ) {
            state.syncingQueuedAppointments =
                true;
        },

        syncQueuedAppointmentsFinished(
            state
        ) {
            state.syncingQueuedAppointments =
                false;
        },

        createAppointmentSuccess(state, action) {
            state.creating = false;
            state.error = null;
            state.conflict = null;

            const appointment =
                action.payload?.data;

            if (appointment) {
                state.appointments = [
                    appointment,
                    ...state.appointments
                ];

                const upcomingDate =
                    new Date(
                        appointment.start_at
                    );

                if (
                    appointment.status !== "cancelled" &&
                    !Number.isNaN(
                        upcomingDate.getTime()
                    ) &&
                    upcomingDate >= new Date()
                ) {
                    state.upcoming = [
                        appointment,
                        ...state.upcoming
                    ].sort(
                        (a, b) =>
                            new Date(a.start_at) -
                            new Date(b.start_at)
                    );
                }
            }

            state.successMessage =
                action.payload?.message ||
                "Appointment created successfully";
        },

        createAppointmentFailure(state, action) {
            state.creating = false;

            const error =
                action.payload || {};

            state.error =
                error?.message ||
                error;

            if (
                error?.status === 409 ||
                error?.code === 409 ||
                error?.conflict
            ) {
                state.conflict =
                    error?.message ||
                    "The selected time conflicts with another appointment.";
            }
        },

        updateAppointmentRequest(state) {
            state.updating = true;
            state.error = null;
            state.conflict = null;
            state.successMessage = null;
        },

        updateAppointmentSuccess(state, action) {
            state.updating = false;
            state.error = null;
            state.conflict = null;

            const updated =
                action.payload?.data;

            if (updated) {
                state.appointments =
                    state.appointments.map(
                        (appointment) =>
                            String(appointment.id) ===
                                String(updated.id)
                                ? updated
                                : appointment
                    );

                state.upcoming =
                    state.upcoming
                        .map(
                            (appointment) =>
                                String(appointment.id) ===
                                    String(updated.id)
                                    ? updated
                                    : appointment
                        )
                        .filter(
                            (appointment) =>
                                appointment.status !==
                                "cancelled"
                        )
                        .sort(
                            (a, b) =>
                                new Date(a.start_at) -
                                new Date(b.start_at)
                        );

                if (
                    state.selectedAppointment &&
                    String(
                        state.selectedAppointment.id
                    ) === String(updated.id)
                ) {
                    state.selectedAppointment =
                        updated;
                }
            }

            state.successMessage =
                action.payload?.message ||
                "Appointment updated successfully";
        },

        updateAppointmentFailure(state, action) {
            state.updating = false;

            const error =
                action.payload || {};

            state.error =
                error?.message ||
                error;

            if (
                error?.status === 409 ||
                error?.code === 409 ||
                error?.conflict
            ) {
                state.conflict =
                    error?.message ||
                    "The selected time conflicts with another appointment.";
            }
        },

        cancelAppointmentRequest(state) {
            state.cancelling = true;
            state.error = null;
            state.successMessage = null;
        },

        cancelAppointmentSuccess(state, action) {
            state.cancelling = false;
            state.error = null;

            const cancelled =
                action.payload?.data;

            if (cancelled) {
                state.appointments =
                    state.appointments.map(
                        (appointment) =>
                            String(appointment.id) ===
                                String(cancelled.id)
                                ? cancelled
                                : appointment
                    );

                state.upcoming =
                    state.upcoming.filter(
                        (appointment) =>
                            String(appointment.id) !==
                            String(cancelled.id)
                    );

                if (
                    state.selectedAppointment &&
                    String(
                        state.selectedAppointment.id
                    ) === String(cancelled.id)
                ) {
                    state.selectedAppointment =
                        cancelled;
                }
            }

            state.successMessage =
                action.payload?.message ||
                "Appointment cancelled successfully";
        },

        cancelAppointmentFailure(state, action) {
            state.cancelling = false;

            state.error =
                action.payload ||
                "Unable to cancel appointment";
        },

        updateAppointmentStatusRequest(state) {
            state.statusUpdating = true;
            state.error = null;
            state.successMessage = null;
        },

        updateAppointmentStatusSuccess(
            state,
            action
        ) {
            state.statusUpdating = false;
            state.error = null;

            const updated =
                action.payload?.data;

            if (updated) {
                state.appointments =
                    state.appointments.map(
                        (appointment) =>
                            String(appointment.id) ===
                                String(updated.id)
                                ? updated
                                : appointment
                    );

                if (
                    updated.status === "cancelled"
                ) {
                    state.upcoming =
                        state.upcoming.filter(
                            (appointment) =>
                                String(
                                    appointment.id
                                ) !==
                                String(updated.id)
                        );
                } else {
                    state.upcoming =
                        state.upcoming
                            .map(
                                (appointment) =>
                                    String(
                                        appointment.id
                                    ) ===
                                        String(updated.id)
                                        ? updated
                                        : appointment
                            )
                            .sort(
                                (a, b) =>
                                    new Date(
                                        a.start_at
                                    ) -
                                    new Date(
                                        b.start_at
                                    )
                            );
                }

                if (
                    state.selectedAppointment &&
                    String(
                        state.selectedAppointment.id
                    ) === String(updated.id)
                ) {
                    state.selectedAppointment =
                        updated;
                }
            }

            state.successMessage =
                action.payload?.message ||
                "Appointment status updated successfully";
        },

        updateAppointmentStatusFailure(
            state,
            action
        ) {
            state.statusUpdating = false;

            state.error =
                action.payload ||
                "Unable to update appointment status";
        },

        fetchProvidersRequest(state) {
            state.providersLoading = true;
            state.providersError = null;
        },

        fetchProvidersSuccess(state, action) {
            state.providersLoading = false;
            state.providersError = null;

            const response = action.payload;
            const data = response?.data;

            state.providers = Array.isArray(data)
                ? data
                : data?.providers || [];
        },

        fetchProvidersFailure(state, action) {
            state.providersLoading = false;
            state.providersError =
                action.payload ||
                "Unable to load providers";
        },

        clearAppointmentError(state) {
            state.error = null;
            state.conflict = null;
        },

        clearAppointmentSuccess(state) {
            state.successMessage = null;
        },

        clearSelectedAppointment(state) {
            state.selectedAppointment = null;
        },

        resetAppointmentState() {
            return initialState;
        }
    }
});

export const {
    fetchAppointmentsRequest,
    fetchAppointmentsSuccess,
    fetchAppointmentsFailure,

    fetchUpcomingRequest,
    fetchUpcomingSuccess,
    fetchUpcomingFailure,

    fetchAppointmentRequest,
    fetchAppointmentSuccess,
    fetchAppointmentFailure,

    createAppointmentRequest,
    createAppointmentSuccess,
    createAppointmentFailure,

    createAppointmentQueued,
    createAppointmentSynced,
    createAppointmentQueueFailure,

    hydrateQueuedAppointments,
    setOnlineStatus,

    syncQueuedAppointmentsRequest,
    syncQueuedAppointmentsFinished,

    updateAppointmentRequest,
    updateAppointmentSuccess,
    updateAppointmentFailure,

    cancelAppointmentRequest,
    cancelAppointmentSuccess,
    cancelAppointmentFailure,

    updateAppointmentStatusRequest,
    updateAppointmentStatusSuccess,
    updateAppointmentStatusFailure,

    fetchProvidersRequest,
    fetchProvidersSuccess,
    fetchProvidersFailure,

    clearAppointmentError,
    clearAppointmentSuccess,
    clearSelectedAppointment,
    resetAppointmentState
    
} = appointmentSlice.actions;

export default appointmentSlice.reducer;