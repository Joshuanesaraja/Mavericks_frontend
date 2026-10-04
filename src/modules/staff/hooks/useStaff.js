import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchStaffRequest,
    fetchStaffMemberRequest,

    createStaffRequest,
    updateStaffRequest,
    updateStaffStatusRequest,
    deleteStaffRequest,

    clearStaffError,
    clearStaffSuccess,
    clearSelectedStaff
} from "../staffSlice";

export default function useStaff() {
    const dispatch = useDispatch();

    const state = useSelector(
        (store) => store.staff
    );

    const getStaff = useCallback(
        () => {
            dispatch(
                fetchStaffRequest()
            );
        },
        [dispatch]
    );

    const getStaffMember =
        useCallback(
            (id) => {
                dispatch(
                    fetchStaffMemberRequest(
                        id
                    )
                );
            },
            [dispatch]
        );

    const createStaff =
        useCallback(
            (staff) => {
                dispatch(
                    createStaffRequest(
                        staff
                    )
                );
            },
            [dispatch]
        );

    const updateStaff =
        useCallback(
            (id, staff) => {
                dispatch(
                    updateStaffRequest({
                        id,
                        staff
                    })
                );
            },
            [dispatch]
        );

    const updateStaffStatus =
        useCallback(
            (id, status) => {
                dispatch(
                    updateStaffStatusRequest({
                        id,
                        status
                    })
                );
            },
            [dispatch]
        );

    const deleteStaff =
        useCallback(
            (id) => {
                dispatch(
                    deleteStaffRequest(id)
                );
            },
            [dispatch]
        );

    const clearError =
        useCallback(
            () => {
                dispatch(
                    clearStaffError()
                );
            },
            [dispatch]
        );

    const clearSuccess =
        useCallback(
            () => {
                dispatch(
                    clearStaffSuccess()
                );
            },
            [dispatch]
        );

    const clearSelected =
        useCallback(
            () => {
                dispatch(
                    clearSelectedStaff()
                );
            },
            [dispatch]
        );

    return {
        ...state,

        getStaff,
        getStaffMember,
        createStaff,
        updateStaff,
        updateStaffStatus,
        deleteStaff,

        clearError,
        clearSuccess,
        clearSelected
    };
}