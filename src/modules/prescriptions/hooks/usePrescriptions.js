import { useCallback } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getPrescriptionsRequest,
    getPrescriptionRequest,
    createPrescriptionRequest,
    updatePrescriptionStatusRequest
} from "../prescriptionSlice";

function selectPrescriptions(state) {
    return state.prescriptions.prescriptions;
}

function selectSelectedPrescription(state) {
    return state.prescriptions.selectedPrescription;
}

function selectPrescriptionLoading(state) {
    return state.prescriptions.loading;
}

function selectPrescriptionError(state) {
    return state.prescriptions.error;
}

export function usePrescriptions() {
    const dispatch = useDispatch();

    const prescriptions = useSelector(
        selectPrescriptions
    );

    const selectedPrescription = useSelector(
        selectSelectedPrescription
    );

    const loading = useSelector(
        selectPrescriptionLoading
    );

    const error = useSelector(
        selectPrescriptionError
    );

    const loadPrescriptions = useCallback(() => {
        dispatch(getPrescriptionsRequest());
    }, [dispatch]);

    const loadPrescription = useCallback(
        (id) => {
            dispatch(
                getPrescriptionRequest(id)
            );
        },
        [dispatch]
    );

    const addPrescription = useCallback(
        (prescriptionData) => {
            dispatch(
                createPrescriptionRequest(
                    prescriptionData
                )
            );
        },
        [dispatch]
    );

    const updateStatus = useCallback(
        (statusData) => {
            dispatch(
                updatePrescriptionStatusRequest(
                    statusData
                )
            );
        },
        [dispatch]
    );

    return {
        prescriptions,
        selectedPrescription,
        loading,
        error,
        loadPrescriptions,
        loadPrescription,
        addPrescription,
        updateStatus
    };
}