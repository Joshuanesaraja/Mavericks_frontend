import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getPatientsRequest,
    getPatientRequest,
    createPatientRequest,
    updatePatientRequest,
    deletePatientRequest
} from "../patientSlice";

import {
    selectPatients,
    selectSelectedPatient,
    selectPatientLoading,
    selectPatientError
} from "../selectors";

export function usePatients() {
    const dispatch = useDispatch();

    const patients = useSelector(selectPatients);
    const selectedPatient = useSelector(selectSelectedPatient);
    const loading = useSelector(selectPatientLoading);
    const error = useSelector(selectPatientError);

    const loadPatients = useCallback(() => {
        dispatch(getPatientsRequest());
    }, [dispatch]);

    const loadPatient = useCallback((id) => {
        dispatch(getPatientRequest(id));
    }, [dispatch]);

    const addPatient = useCallback((patientData) => {
        dispatch(createPatientRequest(patientData));
    }, [dispatch]);

    const editPatient = useCallback((id, patientData) => {
        dispatch(
            updatePatientRequest({
                id,
                patientData
            })
        );
    }, [dispatch]);

    const removePatient = useCallback((id) => {
        dispatch(deletePatientRequest(id));
    }, [dispatch]);

    return {
        patients,
        selectedPatient,
        loading,
        error,
        loadPatients,
        loadPatient,
        addPatient,
        editPatient,
        removePatient
    };
}