import { useEffect, useState } from "react";
import styled from "styled-components";

import useAppointments from "../../modules/appointments/hooks/useAppointments";
import { usePatients } from "../../modules/patients/hooks/usePatients";

import Input from "../common/Input";
import Button from "../common/Button";


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;


const Form = styled.form`
    display: grid;

    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;


const Field = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.xs};
`;


const FullWidthField = styled(Field)`
    grid-column: 1 / -1;
`;


const Label = styled.label`
    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.typography.body};

    font-weight: 600;
`;


const Select = styled.select`
    width: 100%;

    min-height: 40px;

    padding: 10px 12px;

    border: 1px solid
        ${({ theme }) => theme.colors.border};

    border-radius:
        ${({ theme }) => theme.radius.md};

    background:
        ${({ theme }) => theme.colors.surface};

    color:
        ${({ theme }) => theme.colors.text};

    font-family:
        ${({ theme }) =>
        theme.typography.fontFamily};

    font-size:
        ${({ theme }) => theme.typography.body};

    &:focus {
        border-color:
            ${({ theme }) =>
        theme.colors.primary};

        outline: none;
    }

    &:disabled {
        background:
            ${({ theme }) =>
        theme.colors.surfaceHover};

        cursor: not-allowed;

        opacity: 0.7;
    }
`;


const TextArea = styled.textarea`
    width: 100%;

    min-height: 100px;

    padding: 10px 12px;

    resize: vertical;

    border: 1px solid
        ${({ theme }) => theme.colors.border};

    border-radius:
        ${({ theme }) => theme.radius.md};

    background:
        ${({ theme }) => theme.colors.surface};

    color:
        ${({ theme }) => theme.colors.text};

    font-family:
        ${({ theme }) =>
        theme.typography.fontFamily};

    font-size:
        ${({ theme }) => theme.typography.body};

    &:focus {
        border-color:
            ${({ theme }) =>
        theme.colors.primary};

        outline: none;
    }

    &:disabled {
        background:
            ${({ theme }) =>
        theme.colors.surfaceHover};

        cursor: not-allowed;

        opacity: 0.7;
    }
`;


const HelpText = styled.small`
    color:
        ${({ theme }) =>
        theme.colors.textSecondary};

    font-size:
        ${({ theme }) =>
        theme.typography.small};
`;


const ErrorMessage = styled.div`
    grid-column: 1 / -1;

    padding:
        ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};

    border:
        1px solid
        ${({ theme }) =>
        theme.colors.danger};

    border-radius:
        ${({ theme }) =>
        theme.radius.sm};

    background:
        rgba(220, 38, 38, 0.08);

    color:
        ${({ theme }) =>
        theme.colors.danger};

    font-size:
        ${({ theme }) =>
        theme.typography.small};
`;


const FormActions = styled.div`
    display: flex;

    justify-content: flex-end;

    gap: ${({ theme }) =>
        theme.spacing.sm};

    grid-column: 1 / -1;

    padding-top:
        ${({ theme }) =>
        theme.spacing.sm};
`;


function toDateTimeLocal(value) {
    if (!value) {
        return "";
    }

    const date = new Date(
        value.replace(" ", "T")
    );

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const hours = String(
        date.getHours()
    ).padStart(2, "0");

    const minutes = String(
        date.getMinutes()
    ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


function toApiDateTime(value) {
    if (!value) {
        return "";
    }

    return value
        .replace("T", " ")
        .concat(":00");
}


function getPatientId(patient) {
    return patient?.id;
}


function getProviderName(user) {
    return (
        user?.name ||
        user?.full_name ||
        user?.fullName ||
        `Provider #${user?.id}`
    );
}



function AppointmentForm({
    appointment = null,
    onSaved,
    onCancel
}) {
    const {
        createAppointment,
        updateAppointment,
        creating,
        updating,
        error,
        clearError,
        providers,
        providersLoading,
        providersError,
        loadProviders
    } = useAppointments();


    const {
        allPatients,
        allPatientsLoading,
        allPatientsError,
        loadAllPatients
    } = usePatients();


    const [patientId, setPatientId] =
        useState("");


    const [providerId, setProviderId] =
        useState("");


    const [startAt, setStartAt] =
        useState("");


    const [endAt, setEndAt] =
        useState("");


    const [reason, setReason] =
        useState("");


    const [status, setStatus] =
        useState("scheduled");


    /*
     * Load patients and users when
     * the appointment form opens.
     */
    useEffect(() => {
        loadAllPatients();
        loadProviders();
    }, [loadAllPatients, loadProviders]);

    /*
     * Populate the form when editing.
     */
    useEffect(() => {
        clearError();

        if (appointment) {
            setPatientId(
                String(
                    appointment.patient_id ??
                    ""
                )
            );

            setProviderId(
                String(
                    appointment.provider_id ??
                    ""
                )
            );

            setStartAt(
                toDateTimeLocal(
                    appointment.start_at
                )
            );

            setEndAt(
                toDateTimeLocal(
                    appointment.end_at
                )
            );

            setReason(
                appointment.reason || ""
            );

            setStatus(
                appointment.status ||
                "scheduled"
            );

            return;
        }

        setPatientId("");
        setProviderId("");
        setStartAt("");
        setEndAt("");
        setReason("");
        setStatus("scheduled");
    }, [
        appointment,
        clearError
    ]);


    const handleSubmit = (event) => {
        event.preventDefault();

        clearError();

        const startDate =
            new Date(startAt);

        const endDate =
            new Date(endAt);


        if (
            !patientId ||
            !providerId ||
            !startAt ||
            !endAt
        ) {
            return;
        }


        if (
            Number.isNaN(
                startDate.getTime()
            ) ||
            Number.isNaN(
                endDate.getTime()
            )
        ) {
            return;
        }


        if (endDate <= startDate) {
            return;
        }


        const payload = {
            patient_id:
                Number(patientId),

            provider_id:
                Number(providerId),

            start_at:
                toApiDateTime(startAt),

            end_at:
                toApiDateTime(endAt),

            reason:
                reason.trim()
        };


        if (appointment?.id) {
            updateAppointment({
                id: appointment.id,
                ...payload,
                status
            });

            return;
        }


        createAppointment(payload);
    };


    const isSaving =
        creating || updating;


    const loadingPeople =
        allPatientsLoading ||
        providersLoading;


    return (
        <FormContainer>
            <Form
                onSubmit={handleSubmit}
            >

                {error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}


                {allPatientsError && (
                    <ErrorMessage>
                        Unable to load patients:
                        {" "}
                        {allPatientsError}
                    </ErrorMessage>
                )}


                {providersError && (
                    <ErrorMessage>
                        Unable to load providers:
                        {" "}
                        {providersError}
                    </ErrorMessage>
                )}


                <Field>
                    <Label htmlFor="appointment-patient">
                        Patient ID
                    </Label>

                    <Select
                        id="appointment-patient"
                        name="patient_id"
                        value={patientId}
                        onChange={(event) => setPatientId(event.target.value)}
                        required
                        disabled={isSaving || allPatientsLoading}
                    >
                        <option value="">
                            {allPatientsLoading
                                ? "Loading patients..."
                                : "Select patient ID"}
                        </option>

                        {allPatients.map((patient) => {
                            const id = getPatientId(patient);

                            if (!id) return null;

                            return (
                                <option key={id} value={id}>
                                    {id}
                                </option>
                            );
                        })}
                    </Select>

                    <HelpText>
                        Select the patient ID for this appointment.
                    </HelpText>
                </Field>
                <Field>
                    <Label
                        htmlFor="appointment-provider"
                    >
                        Provider
                    </Label>

                    <Select
                        id="appointment-provider"
                        name="provider_id"
                        value={providerId}
                        onChange={(event) =>
                            setProviderId(
                                event.target.value
                            )
                        }
                        required
                        disabled={
                            isSaving ||
                            providersLoading
                        }
                    >
                        <option value="">
                            {providersLoading
                                ? "Loading providers..."
                                : "Select provider"}
                        </option>

                        {providers.map(
                            (provider) => (
                                <option
                                    key={provider.id}
                                    value={provider.id}
                                >
                                    {getProviderName(
                                        provider
                                    )}
                                </option>
                            )
                        )}
                    </Select>

                    <HelpText>
                        Only users with the
                        Provider role are shown.
                    </HelpText>
                </Field>


                <Field>
                    <Label
                        htmlFor="appointment-start"
                    >
                        Start date & time
                    </Label>

                    <Input
                        id="appointment-start"
                        name="start_at"
                        type="datetime-local"
                        value={startAt}
                        onChange={(event) =>
                            setStartAt(
                                event.target.value
                            )
                        }
                        required
                        disabled={isSaving}
                    />
                </Field>


                <Field>
                    <Label
                        htmlFor="appointment-end"
                    >
                        End date & time
                    </Label>

                    <Input
                        id="appointment-end"
                        name="end_at"
                        type="datetime-local"
                        value={endAt}
                        onChange={(event) =>
                            setEndAt(
                                event.target.value
                            )
                        }
                        required
                        disabled={isSaving}
                    />
                </Field>


                <Field>
                    <Label htmlFor="appointment-status">
                        Status
                    </Label>

                    <Select
                        id="appointment-status"
                        name="status"
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value
                            )
                        }
                        disabled={
                            isSaving ||
                            !appointment
                        }
                    >
                        <option value="scheduled">
                            Scheduled
                        </option>

                        <option value="confirmed">
                            Confirmed
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>
                    </Select>
                </Field>


                <FullWidthField>
                    <Label htmlFor="appointment-reason">
                        Reason
                    </Label>

                    <TextArea
                        id="appointment-reason"
                        name="reason"
                        value={reason}
                        onChange={(event) =>
                            setReason(
                                event.target.value
                            )
                        }
                        placeholder="Enter appointment reason"
                        disabled={isSaving}
                    />
                </FullWidthField>


                <FormActions>
                    <Button
                        type="button"
                        onClick={onCancel}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={
                            isSaving ||
                            loadingPeople ||
                            !patientId ||
                            !providerId ||
                            !startAt ||
                            !endAt
                        }
                    >
                        {isSaving
                            ? "Saving..."
                            : appointment
                                ? "Update Appointment"
                                : "Create Appointment"}
                    </Button>
                </FormActions>

            </Form>
        </FormContainer>
    );
}


export default AppointmentForm;