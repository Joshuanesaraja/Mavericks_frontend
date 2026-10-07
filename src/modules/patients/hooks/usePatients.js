import { useCallback } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getPatientsRequest,
    getPatientRequest,
    createPatientRequest,
    updatePatientRequest,
    deletePatientRequest,
    getAllPatientsRequest,
    prefetchPatientsRequest,
    setCurrentPatientsFromBatch
} from "../patientSlice";

import {
    selectPatients,
    selectSelectedPatient,
    selectPatientLoading,
    selectPatientError,
    selectPatientPagination,
    selectPatientLoadedBatches,
    selectPatientPrefetchLoading,
    selectPatientPrefetchError,
    selectAllPatients,
    selectAllPatientsLoading,
    selectAllPatientsError
} from "../selectors";

const PATIENT_BATCH_SIZE = 10;

export function usePatients() {
    const dispatch = useDispatch();

    const patients =
        useSelector(selectPatients);

    const selectedPatient =
        useSelector(
            selectSelectedPatient
        );

    const loading =
        useSelector(
            selectPatientLoading
        );

    const error =
        useSelector(
            selectPatientError
        );

    const pagination =
        useSelector(
            selectPatientPagination
        );

    const loadedBatches =
        useSelector(
            selectPatientLoadedBatches
        );

    const prefetchLoading =
        useSelector(
            selectPatientPrefetchLoading
        );

    const prefetchError =
        useSelector(
            selectPatientPrefetchError
        );
    const allPatients =
        useSelector(selectAllPatients);

    const allPatientsLoading =
        useSelector(selectAllPatientsLoading);

    const allPatientsError =
        useSelector(selectAllPatientsError);
    /*
     * Normal API load.
     *
     * Always fetch exactly 10.
     */
    const loadPatients =
        useCallback(
            (page = 1) => {
                dispatch(
                    getPatientsRequest({
                        page,
                        limit:
                            PATIENT_BATCH_SIZE
                    })
                );
            },
            [dispatch]
        );

        //load all patients
    const loadAllPatients =
        useCallback(() => {
            dispatch(
                getAllPatientsRequest()
            );
        }, [dispatch]);
    /*
     * Background API load.
     *
     * Also always fetch exactly 10.
     */
    const prefetchPatients =
        useCallback(
            (page) => {
                dispatch(
                    prefetchPatientsRequest(
                        {
                            page,
                            limit:
                                PATIENT_BATCH_SIZE
                        }
                    )
                );
            },
            [dispatch]
        );

    /*
     * Switch to a batch that has already
     * been fetched.
     *
     * NO API request happens here.
     */
    const setCachedPatients =
        useCallback(
            (page) => {
                dispatch(
                    setCurrentPatientsFromBatch(
                        page
                    )
                );
            },
            [dispatch]
        );

    const loadPatient =
        useCallback(
            (id) => {
                dispatch(
                    getPatientRequest(id)
                );
            },
            [dispatch]
        );

    const addPatient =
        useCallback(
            (patientData) => {
                dispatch(
                    createPatientRequest(
                        patientData
                    )
                );
            },
            [dispatch]
        );

    const editPatient =
        useCallback(
            (id, patientData) => {
                dispatch(
                    updatePatientRequest({
                        id,
                        patientData
                    })
                );
            },
            [dispatch]
        );

    const removePatient =
        useCallback(
            (id) => {
                dispatch(
                    deletePatientRequest(id)
                );
            },
            [dispatch]
        );

    return {
        patients,
        selectedPatient,

        loading,
        error,

        pagination,
        loadedBatches,

        prefetchLoading,
        prefetchError,

        loadPatients,
        prefetchPatients,
        setCachedPatients,

        loadPatient,
        addPatient,
        editPatient,
        removePatient,

        allPatients,
        allPatientsLoading,
        allPatientsError,
        loadAllPatients
    };
}