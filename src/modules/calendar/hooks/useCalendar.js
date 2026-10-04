import {
    useCallback
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchDateRequest,
    fetchRangeRequest,
    fetchTodayRequest,

    fetchProvidersRequest,

    fetchAvailabilityRequest,

    rescheduleAppointmentRequest,

    clearCalendarError,
    clearCalendarSuccess
} from "../calendarSlice";

export default function useCalendar() {
    const dispatch =
        useDispatch();

    const state =
        useSelector(
            (store) =>
                store.calendar
        );

    const getByDate =
        useCallback(
            (date) => {
                dispatch(
                    fetchDateRequest(
                        date
                    )
                );
            },
            [dispatch]
        );

    const getByRange =
        useCallback(
            (
                startDate,
                endDate
            ) => {
                dispatch(
                    fetchRangeRequest({
                        startDate,
                        endDate
                    })
                );
            },
            [dispatch]
        );

    const getToday =
        useCallback(
            () => {
                dispatch(
                    fetchTodayRequest()
                );
            },
            [dispatch]
        );

    const getProviders =
        useCallback(
            () => {
                dispatch(
                    fetchProvidersRequest()
                );
            },
            [dispatch]
        );

    const getAvailability =
        useCallback(
            (options) => {
                dispatch(
                    fetchAvailabilityRequest(
                        options
                    )
                );
            },
            [dispatch]
        );

    const rescheduleAppointment =
        useCallback(
            (appointment) => {
                dispatch(
                    rescheduleAppointmentRequest(
                        appointment
                    )
                );
            },
            [dispatch]
        );

    const clearError =
        useCallback(
            () => {
                dispatch(
                    clearCalendarError()
                );
            },
            [dispatch]
        );

    const clearSuccess =
        useCallback(
            () => {
                dispatch(
                    clearCalendarSuccess()
                );
            },
            [dispatch]
        );

    return {
        ...state,

        getByDate,
        getByRange,
        getToday,
        getProviders,
        getAvailability,

        rescheduleAppointment,

        clearError,
        clearSuccess
    };
}