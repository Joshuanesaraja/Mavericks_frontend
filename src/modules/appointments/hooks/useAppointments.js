import { useCallback } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchAppointmentsRequest,
    fetchUpcomingRequest,
    fetchAppointmentRequest,
    fetchProvidersRequest,

    createAppointmentRequest,
    updateAppointmentRequest,

    cancelAppointmentRequest,
    updateAppointmentStatusRequest,

    clearAppointmentError,
    clearAppointmentSuccess,
    clearSelectedAppointment,

    resetAppointmentState
} from "../appointmentSlice";

const selectAppointments = (state) =>
    state.appointments || {
        appointments: [],
        upcoming: [],
        selectedAppointment: null,
        loading: false,
        creating: false,
        updating: false,
        cancelling: false,
        error: null,
        successMessage: null
    };

export default function useAppointments() {
    const dispatch = useDispatch();

    const appointmentState =
        useSelector(selectAppointments);

    const getAppointments = useCallback(
        (params = {}) => {
            dispatch(
                fetchAppointmentsRequest(params)
            );
        },
        [dispatch]
    );

    const getUpcomingAppointments =
        useCallback(() => {
            dispatch(
                fetchUpcomingRequest()
            );
        }, [dispatch]);

    const loadProviders =
        useCallback(() => {
            dispatch(
                fetchProvidersRequest()
            );
        }, [dispatch]);

    const getAppointment =
        useCallback(
            (id) => {
                if (!id) {
                    return;
                }

                dispatch(
                    fetchAppointmentRequest(id)
                );
            },
            [dispatch]
        );

    const createAppointment =
        useCallback(
            (appointment) => {
                dispatch(
                    createAppointmentRequest(
                        appointment
                    )
                );
            },
            [dispatch]
        );

    const updateAppointment =
        useCallback(
            (appointment) => {
                dispatch(
                    updateAppointmentRequest(
                        appointment
                    )
                );
            },
            [dispatch]
        );

    const cancelAppointment =
        useCallback(
            (id, reason = "") => {
                dispatch(
                    cancelAppointmentRequest({
                        id,
                        reason
                    })
                );
            },
            [dispatch]
        );

    const updateAppointmentStatus =
        useCallback(
            (id, status) => {
                dispatch(
                    updateAppointmentStatusRequest({
                        id,
                        status
                    })
                );
            },
            [dispatch]
        );

    const clearError =
        useCallback(() => {
            dispatch(
                clearAppointmentError()
            );
        }, [dispatch]);

    const clearSuccess =
        useCallback(() => {
            dispatch(
                clearAppointmentSuccess()
            );
        }, [dispatch]);

    const clearSelected =
        useCallback(() => {
            dispatch(
                clearSelectedAppointment()
            );
        }, [dispatch]);

    const reset =
        useCallback(() => {
            dispatch(
                resetAppointmentState()
            );
        }, [dispatch]);

    return {
        ...appointmentState,

        getAppointments,
        getUpcomingAppointments,
        loadProviders,
        getAppointment,

        createAppointment,
        updateAppointment,
        cancelAppointment,
        updateAppointmentStatus,

        clearError,
        clearSuccess,
        clearSelected,
        reset
    };
}