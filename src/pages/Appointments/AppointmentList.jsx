import {
    useEffect,
    useMemo,
    useState
} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import useAppointments from "../../modules/appointments/hooks/useAppointments";
import AppointmentForm from "../../components/forms/AppointmentForm";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import Table from "../../components/common/Table";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
`;

const PageHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const PageTitle = styled.h1`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h1};
`;

const PageSubtitle = styled.p`
    margin: ${({ theme }) => theme.spacing.xs} 0 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.body};
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.spacing.sm};

    flex-wrap: wrap;
`;

const ConnectivityBanner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) =>
        theme.spacing.md};

    padding: ${({ theme }) =>
        theme.spacing.md};

    border: 1px solid
        ${({ theme, $online }) =>
            $online
                ? theme.colors.success
                : theme.colors.warning};

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ $online }) =>
            $online
                ? "rgba(22, 163, 74, 0.08)"
                : "rgba(217, 119, 6, 0.08)"};

    color:
        ${({ theme }) =>
            theme.colors.text};

    @media (max-width: 700px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

const ConnectivityText = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) =>
        theme.spacing.xs};
`;

const ConnectivityTitle = styled.strong`
    color:
        ${({ theme }) =>
            theme.colors.text};
`;

const ConnectivityDescription = styled.span`
    color:
        ${({ theme }) =>
            theme.colors.textSecondary};

    font-size:
        ${({ theme }) =>
            theme.typography.small};
`;

const QueueBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 32px;

    padding: 6px 10px;

    border-radius:
        ${({ theme }) =>
            theme.radius.pill};

    background:
        ${({ theme }) =>
            theme.colors.surface};

    color:
        ${({ theme }) =>
            theme.colors.text};

    font-size:
        ${({ theme }) =>
            theme.typography.small};

    font-weight: 600;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.md};

    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.md};
`;

const SectionHeading = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.xs};
`;

const SectionTitle = styled.h2`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h2};
`;

const SectionDescription = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

const UpcomingGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(
        auto-fit,
        minmax(260px, 1fr)
    );

    gap: ${({ theme }) => theme.spacing.md};
`;

const UpcomingCard = styled.article`
    display: flex;
    flex-direction: column;

    min-height: 190px;

    gap: ${({ theme }) => theme.spacing.md};

    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    box-shadow: ${({ theme }) => theme.shadows.sm};

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);

        border-color: ${({ theme }) => theme.colors.primary};

        box-shadow: ${({ theme }) => theme.shadows.md};
    }
`;

const AppointmentHeading = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.sm};
`;

const AppointmentName = styled.h3`
    margin: 0;

    color: ${({ theme }) => theme.colors.primary};

    font-size: 16px;
    font-weight: 600;
`;

const AppointmentMeta = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};

    line-height: 1.5;
`;

const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;
    width: fit-content;

    padding: 5px 10px;

    border-radius:
        ${({ theme }) =>
        theme.radius.pill};

    background: ${({ theme, $status }) => {
        if ($status === "completed") {
            return "rgba(22, 163, 74, 0.12)";
        }

        if ($status === "cancelled") {
            return "rgba(220, 38, 38, 0.12)";
        }

        if ($status === "confirmed") {
            return "rgba(37, 99, 235, 0.12)";
        }

        if ($status === "no-show") {
            return "rgba(217, 119, 6, 0.12)";
        }

        return "rgba(15, 118, 110, 0.12)";
    }};

    color: ${({ theme, $status }) => {
        if ($status === "completed") {
            return theme.colors.success;
        }

        if ($status === "cancelled") {
            return theme.colors.danger;
        }

        if ($status === "confirmed") {
            return theme.colors.info;
        }

        if ($status === "no-show") {
            return theme.colors.warning;
        }

        return theme.colors.primary;
    }};
`;

const CardActions = styled.div`
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.spacing.sm};

    flex-wrap: wrap;

    margin-top: auto;
`;

const OutlineButton = styled(Button)`
    background: transparent;

    border: 1px solid ${({ theme }) => theme.colors.primary};

    color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.primary};

        color: #ffffff;
    }
`;

const DangerButton = styled(Button)`
    background: ${({ theme }) => theme.colors.danger};

    &:hover:not(:disabled) {
        background: #b91c1c;
    }
`;

const Message = styled.div`
    padding: ${({ theme }) => theme.spacing.lg};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};

    color: ${({ theme }) => theme.colors.textSecondary};

    background: ${({ theme }) => theme.colors.surfaceHover};

    text-align: center;
`;

const ErrorMessage = styled(Message)`
    border-color: ${({ theme }) => theme.colors.danger};

    color: ${({ theme }) => theme.colors.danger};

    background: rgba(220, 38, 38, 0.06);
`;

const TableActions = styled.div`
    display: flex;

    align-items: center;

    gap: ${({ theme }) => theme.spacing.xs};

    flex-wrap: wrap;
`;

const SmallButton = styled(Button)`
    min-height: 34px;

    padding: 7px 11px;

    font-size: ${({ theme }) => theme.typography.small};
`;

const DangerSmallButton = styled(SmallButton)`
    background: ${({ theme }) => theme.colors.danger};

    &:hover:not(:disabled) {
        background: #b91c1c;
    }
`;

const DetailsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(
        2,
        minmax(0, 1fr)
    );

    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const DetailItem = styled.div`
    padding: ${({ theme }) => theme.spacing.md};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.surfaceHover};
`;

const DetailLabel = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

const DetailValue = styled.div`
    color: ${({ theme }) => theme.colors.text};

    font-weight: 600;

    word-break: break-word;
`;

const CancelContent = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.md};
`;

const CancelText = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};
`;

const CancelAppointmentSummary = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.xs};

    padding: ${({ theme }) => theme.spacing.md};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.surfaceHover};

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const CancelInput = styled.input`
    min-height: 40px;

    padding: 10px 12px;

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.surface};

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};

        outline: none;
    }
`;

const CancelActions = styled.div`
    display: flex;

    justify-content: flex-end;

    gap: ${({ theme }) => theme.spacing.sm};

    flex-wrap: wrap;
`;

function formatDateTime(value) {
    if (!value) {
        return "—";
    }

    const date = new Date(
        String(value).replace(" ", "T")
    );

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString(
        undefined,
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );
}

function getStatusLabel(status) {
    if (!status) {
        return "Unknown";
    }

    return status
        .replace("-", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        );
}

function isPendingAppointment(appointment) {
    return (
        appointment?.syncStatus === "pending" ||
        Boolean(appointment?.offlineQueueId) ||
        String(appointment?.id ?? "").startsWith("offline-")
    );
}

function AppointmentList() {
    const user = useSelector(
        (state) => state.auth?.user
    );

    const userRoles = Array.isArray(user?.roles)
        ? user.roles
            .map((role) =>
                typeof role === "string"
                    ? role.toLowerCase()
                    : role?.name?.toLowerCase()
            )
            .filter(Boolean)
        : [];

    const canManageAppointments =
        userRoles.includes("provider") ||
        userRoles.includes("nurse") ||
        userRoles.includes("patient");

    const canViewUpcoming =
        canManageAppointments;

    const {
        appointments,
        upcoming,
        selectedAppointment,
        loading,
        upcomingLoading,
        creating,
        updating,
        cancelling,
        error,
        successMessage,
        isOnline,
        queuedAppointments,
        syncingQueuedAppointments,
        getAppointments,
        getUpcomingAppointments,
        getAppointment,
        cancelAppointment,
        updateAppointmentStatus,
        clearError,
        clearSuccess,
        clearSelected,
    } = useAppointments();

    const [
        formOpen,
        setFormOpen
    ] = useState(false);

    const [
        editingAppointment,
        setEditingAppointment
    ] = useState(null);

    const [
        detailsOpen,
        setDetailsOpen
    ] = useState(false);

    const [
        cancelOpen,
        setCancelOpen
    ] = useState(false);

    const [
        appointmentToCancel,
        setAppointmentToCancel
    ] = useState(null);

    const [
        cancelReason,
        setCancelReason
    ] = useState("");

    useEffect(() => {
        if (!isOnline) {
            return;
        }

        getAppointments();

        if (canViewUpcoming) {
            getUpcomingAppointments();
        }
    }, [
        isOnline,
        getAppointments,
        getUpcomingAppointments,
        canViewUpcoming
    ]);

    useEffect(() => {
        if (!successMessage) {
            return;
        }

        const wasOfflineQueued =
            successMessage ===
            "Appointment saved offline. It will be synced automatically when you are online.";

        /*
        * Offline queue already exists in Redux.
        *
        * Don't make an API request while offline.
        */
        if (!wasOfflineQueued) {
            getAppointments();

            if (canViewUpcoming) {
                getUpcomingAppointments();
            }
        }

        clearSuccess();

        setFormOpen(false);
        setEditingAppointment(null);
    }, [
        successMessage,
        getAppointments,
        getUpcomingAppointments,
        clearSuccess,
        canViewUpcoming
    ]);
    const columns = useMemo(
        () => [
            {
                key: "patient",
                label: "Patient"
            },
            {
                key: "provider",
                label: "Provider"
            },
            {
                key: "start",
                label: "Start"
            },
            {
                key: "end",
                label: "End"
            },
            {
                key: "status",
                label: "Status"
            },
            {
                key: "actions",
                label: "Actions"
            }
        ],
        []
    );

    const openCreate = () => {
        clearError();

        setEditingAppointment(null);

        setFormOpen(true);
    };

    const openEdit = (appointment) => {
        clearError();

        setEditingAppointment(
            appointment
        );

        setFormOpen(true);
    };

    const openDetails = (appointment) => {
        clearError();

        getAppointment(
            appointment.id
        );

        setDetailsOpen(true);
    };

    const closeDetails = () => {
        setDetailsOpen(false);

        clearSelected();
    };

    const openCancel = (appointment) => {
        clearError();

        setAppointmentToCancel(
            appointment
        );

        setCancelReason("");

        setCancelOpen(true);
    };

    const closeCancel = () => {
        if (cancelling) {
            return;
        }

        setCancelOpen(false);

        setAppointmentToCancel(
            null
        );

        setCancelReason("");
    };

    const handleCancel = () => {
        if (!appointmentToCancel?.id) {
            return;
        }

        cancelAppointment(
            appointmentToCancel.id,
            cancelReason.trim()
        );
    };

    useEffect(() => {
        if (
            successMessage &&
            appointmentToCancel
        ) {
            setCancelOpen(false);

            setAppointmentToCancel(null);

            setCancelReason("");
        }
    }, [
        successMessage,
        appointmentToCancel
    ]);

    return (
        <PageContainer>
            <PageHeader>
                <div>
                    <PageTitle>
                        Appointments
                    </PageTitle>

                    <PageSubtitle>
                        Create, reschedule, review and
                        manage appointments.
                    </PageSubtitle>
                </div>

                <HeaderActions>
                    <OutlineButton
                        type="button"
                        onClick={() => {
                            getAppointments();

                            if (canViewUpcoming) {
                                getUpcomingAppointments();
                            }
                        }}
                        disabled={
                                loading ||
                                !isOnline
                            }
                    >
                        Refresh
                    </OutlineButton>

                    {canManageAppointments && (
                        <Button
                            type="button"
                            onClick={openCreate}
                        >
                            New Appointment
                        </Button>
                    )}
                </HeaderActions>
            </PageHeader>
            <ConnectivityBanner
                $online={isOnline}
            >
                <ConnectivityText>
                    <ConnectivityTitle>
                        {isOnline
                            ? "Online"
                            : "Offline"}
                    </ConnectivityTitle>

                    <ConnectivityDescription>
                        {isOnline
                            ? syncingQueuedAppointments
                                ? "Syncing saved offline appointments..."
                                : queuedAppointments.length > 0
                                    ? "Your saved offline appointments are waiting to sync."
                                    : "Appointments will be saved directly to the server."
                            : "New appointments are saved on this device and will sync automatically when the connection returns."}
                    </ConnectivityDescription>
                </ConnectivityText>

                {queuedAppointments.length > 0 && (
                    <QueueBadge>
                        {queuedAppointments.length} pending
                    </QueueBadge>
                )}
            </ConnectivityBanner>    
            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}

            {canViewUpcoming && (
                <Section>
                    <SectionHeader>
                        <SectionHeading>
                            <SectionTitle>
                                Upcoming Appointments
                            </SectionTitle>

                            <SectionDescription>
                                View your upcoming scheduled
                                appointments.
                            </SectionDescription>
                        </SectionHeading>
                    </SectionHeader>

                    {upcomingLoading &&
                        upcoming.length === 0 && (
                            <Loader />
                        )}

                    {!upcomingLoading &&
                        upcoming.length === 0 && (
                            <Message>
                                No upcoming appointments
                                found.
                            </Message>
                        )}

                    {upcoming.length > 0 && (
                        <UpcomingGrid>
                            {upcoming
                                .slice(0, 6)
                                .map(
                                    (appointment) => (
                                        <UpcomingCard
                                            key={
                                                appointment.id
                                            }
                                        >
                                            <AppointmentHeading>
                                                <AppointmentName>
                                                    {appointment.patient_name ||
                                                        `Patient #${appointment.patient_id}`}
                                                </AppointmentName>

                                                <StatusBadge
                                                    $status={
                                                        isPendingAppointment(appointment)
                                                            ? "no-show"
                                                            : appointment.status
                                                    }
                                                >
                                                    {isPendingAppointment(appointment)
                                                        ? "Pending sync"
                                                        : getStatusLabel(appointment.status)}
                                                </StatusBadge>
                                            </AppointmentHeading>

                                            <AppointmentMeta>
                                                <span>
                                                    Provider:{" "}
                                                    {appointment.provider_name ||
                                                        `#${appointment.provider_id}`}
                                                </span>

                                                <span>
                                                    {formatDateTime(
                                                        appointment.start_at
                                                    )}
                                                </span>

                                                <span>
                                                    Until{" "}
                                                    {formatDateTime(
                                                        appointment.end_at
                                                    )}
                                                </span>

                                                {appointment.reason && (
                                                    <span>
                                                        {
                                                            appointment.reason
                                                        }
                                                    </span>
                                                )}
                                            </AppointmentMeta>

                                            <CardActions>
                                            <OutlineButton
                                                type="button"
                                                onClick={() => openDetails(appointment)}
                                                disabled={
                                                    !isOnline ||
                                                    isPendingAppointment(appointment)
                                                }
                                            >
                                                Details
                                            </OutlineButton>

                                            {canManageAppointments && (
                                                <Button
                                                    type="button"
                                                    onClick={() => openEdit(appointment)}
                                                    disabled={
                                                        !isOnline ||
                                                        isPendingAppointment(appointment) ||
                                                        appointment.status === "cancelled"
                                                    }
                                                >
                                                    Reschedule
                                                </Button>
                                            )}
                                        </CardActions>
                                        </UpcomingCard>
                                    )
                                )}
                        </UpcomingGrid>
                    )}
                </Section>
            )}

            <Section>
                <SectionHeader>
                    <SectionHeading>
                        <SectionTitle>
                            Appointment List
                        </SectionTitle>

                        <SectionDescription>
                            View and manage all appointments.
                        </SectionDescription>
                    </SectionHeading>
                </SectionHeader>

                {loading &&
                    appointments.length === 0 && (
                        <Loader />
                    )}

                {!loading &&
                    appointments.length === 0 && (
                        <Message>
                            No appointments found.
                        </Message>
                    )}

                {appointments.length > 0 && (
                    <Table
                        columns={columns}
                        data={appointments}
                        renderRow={(
                            appointment,
                            Cell
                        ) => (
                            <>
                                <Cell>
                                    {appointment.patient_name ||
                                        `#${appointment.patient_id}`}
                                </Cell>

                                <Cell>
                                    {appointment.provider_name ||
                                        `#${appointment.provider_id}`}
                                </Cell>

                                <Cell>
                                    {formatDateTime(
                                        appointment.start_at
                                    )}
                                </Cell>

                                <Cell>
                                    {formatDateTime(
                                        appointment.end_at
                                    )}
                                </Cell>

                                <Cell>
                                    <StatusBadge
                                        $status={
                                            appointment.status
                                        }
                                    >
                                        {getStatusLabel(
                                            appointment.status
                                        )}
                                    </StatusBadge>
                                </Cell>

                                <Cell>
                                    <TableActions>
                                        {isOnline &&
                                        !isPendingAppointment(appointment) && (
                                            <SmallButton
                                                type="button"
                                                onClick={() => openDetails(appointment)}
                                            >
                                                View
                                            </SmallButton>
                                        )}
                                        {canManageAppointments && (
                                            <>
                                                <SmallButton
                                                    type="button"
                                                    onClick={() => openEdit(appointment)}
                                                    disabled={
                                                        !isOnline ||
                                                        isPendingAppointment(appointment) ||
                                                        appointment.status === "cancelled"
                                                    }
                                                >
                                                    Edit
                                                </SmallButton>

                                                {appointment.status !== "cancelled" && (
                                                    <DangerSmallButton
                                                        type="button"
                                                        onClick={() => openCancel(appointment)}
                                                        disabled={
                                                            !isOnline ||
                                                            isPendingAppointment(appointment)
                                                        }
                                                    >
                                                        Cancel
                                                    </DangerSmallButton>
                                                )}

                                                {appointment.status === "scheduled" && (
                                                    <SmallButton
                                                        type="button"
                                                        onClick={() =>
                                                            updateAppointmentStatus(
                                                                appointment.id,
                                                                "confirmed"
                                                            )
                                                        }
                                                        disabled={
                                                            updating ||
                                                            !isOnline ||
                                                            isPendingAppointment(appointment)
                                                        }
                                                    >
                                                        Confirm
                                                    </SmallButton>
                                                )}
                                            </>
                                        )}
                                    </TableActions>
                                </Cell>
                            </>
                        )}
                    />
                )}
            </Section>

            <Modal
                isOpen={formOpen}
                onClose={() => {
                    if (
                        !creating &&
                        !updating
                    ) {
                        setFormOpen(false);

                        setEditingAppointment(
                            null
                        );

                        clearError();
                    }
                }}
                title={
                    editingAppointment
                        ? "Reschedule Appointment"
                        : "Create Appointment"
                }
            >
                <AppointmentForm
                    appointment={
                        editingAppointment
                    }
                    onCancel={() => {
                        setFormOpen(false);

                        setEditingAppointment(
                            null
                        );

                        clearError();
                    }}
                />
            </Modal>

            <Modal
                isOpen={detailsOpen}
                onClose={closeDetails}
                title="Appointment Details"
            >
                {loading &&
                    !selectedAppointment && (
                        <Loader />
                    )}

                {selectedAppointment && (
                    <DetailsGrid>
                        <DetailItem>
                            <DetailLabel>
                                Patient
                            </DetailLabel>

                            <DetailValue>
                                {selectedAppointment.patient_name ||
                                    `#${selectedAppointment.patient_id}`}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Provider
                            </DetailLabel>

                            <DetailValue>
                                {selectedAppointment.provider_name ||
                                    `#${selectedAppointment.provider_id}`}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Start
                            </DetailLabel>

                            <DetailValue>
                                {formatDateTime(
                                    selectedAppointment.start_at
                                )}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                End
                            </DetailLabel>

                            <DetailValue>
                                {formatDateTime(
                                    selectedAppointment.end_at
                                )}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Status
                            </DetailLabel>

                            <DetailValue>
                                {getStatusLabel(
                                    selectedAppointment.status
                                )}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Reason
                            </DetailLabel>

                            <DetailValue>
                                {selectedAppointment.reason ||
                                    "No reason provided"}
                            </DetailValue>
                        </DetailItem>
                    </DetailsGrid>
                )}
            </Modal>

            <Modal
                isOpen={cancelOpen}
                onClose={closeCancel}
                title="Cancel Appointment"
            >
                <CancelContent>
                    <CancelText>
                        Are you sure you want to cancel
                        this appointment?
                    </CancelText>

                    {appointmentToCancel && (
                        <CancelAppointmentSummary>
                            <strong>
                                {appointmentToCancel.patient_name ||
                                    `Patient #${appointmentToCancel.patient_id}`}
                            </strong>

                            <span>
                                {formatDateTime(
                                    appointmentToCancel.start_at
                                )}
                            </span>
                        </CancelAppointmentSummary>
                    )}

                    <CancelInput
                        value={cancelReason}
                        onChange={(event) =>
                            setCancelReason(
                                event.target.value
                            )
                        }
                        placeholder="Optional cancellation reason"
                        disabled={cancelling}
                    />

                    <CancelActions>
                        <OutlineButton
                            type="button"
                            onClick={closeCancel}
                            disabled={cancelling}
                        >
                            Keep Appointment
                        </OutlineButton>

                        <DangerButton
                            type="button"
                            onClick={handleCancel}
                            disabled={cancelling}
                        >
                            {cancelling
                                ? "Cancelling..."
                                : "Cancel Appointment"}
                        </DangerButton>
                    </CancelActions>
                </CancelContent>
            </Modal>
        </PageContainer>
    );
}

export default AppointmentList;