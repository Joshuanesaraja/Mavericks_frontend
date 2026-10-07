import {
    useEffect,
    useMemo,
    useState
} from "react";

import styled from "styled-components";

import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";

import useCalendar from "../../modules/calendar/hooks/useCalendar";

/* =========================================================
   PAGE
========================================================= */

const Page = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    min-width: 0;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 16px;

    min-width: 0;

    @media (max-width: 700px) {
        align-items: flex-start;
    }
`;

const HeaderContent = styled.div`
    min-width: 0;
`;

const Title = styled.h1`
    margin: 0;

    font-size: 28px;
    line-height: 1.2;
`;

const Subtitle = styled.p`
    margin: 6px 0 0;

    color: ${({ theme }) =>
        theme.colors.textSecondary};

    font-size: 14px;
`;

/* =========================================================
   COMMON CARD
========================================================= */

const Card = styled.div`
    background: ${({ theme }) =>
        theme.colors.surface};

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius:
        ${({ theme }) =>
            theme.radius.lg};

    box-shadow:
        ${({ theme }) =>
            theme.shadows.sm};

    min-width: 0;
`;

/* =========================================================
   CALENDAR TOOLBAR
========================================================= */

const Toolbar = styled(Card)`
    padding: 12px 14px;

    display: flex;
    align-items: center;

    gap: 12px;

    min-width: 0;

    overflow-x: auto;

    white-space: nowrap;

    scrollbar-width: thin;
`;

const ToolbarGroup = styled.div`
    display: flex;
    align-items: center;

    gap: 8px;

    flex: 0 0 auto;

    white-space: nowrap;
`;

const ToolbarDate = styled.div`
    flex: 1 1 auto;

    min-width: 0;

    text-align: center;

    font-size: 14px;
    font-weight: 700;

    color:
        ${({ theme }) =>
            theme.colors.text};

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
`;

const DateInput = styled.input`
    width: 150px;

    min-height: 40px;

    padding: 8px 12px;

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ theme }) =>
            theme.colors.surface};

    color:
        ${({ theme }) =>
            theme.colors.text};

    font-size: 13px;

    outline: none;

    flex: 0 0 auto;

    &:focus {
        border-color:
            ${({ theme }) =>
                theme.colors.primary};
    }
`;

const Select = styled.select`
    min-height: 40px;

    min-width: 210px;

    padding: 8px 12px;

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ theme }) =>
            theme.colors.surface};

    color:
        ${({ theme }) =>
            theme.colors.text};

    font-size: 13px;

    outline: none;

    flex: 0 0 auto;

    &:focus {
        border-color:
            ${({ theme }) =>
                theme.colors.primary};
    }
`;

/* =========================================================
   MESSAGES
========================================================= */

const ErrorBox = styled.div`
    padding: 12px 16px;

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background: rgba(
        220,
        38,
        38,
        0.08
    );

    border: 1px solid
        ${({ theme }) =>
            theme.colors.danger};

    color:
        ${({ theme }) =>
            theme.colors.danger};

    font-size: 14px;
`;

const SuccessBox = styled.div`
    padding: 12px 16px;

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background: rgba(
        22,
        163,
        74,
        0.08
    );

    border: 1px solid
        ${({ theme }) =>
            theme.colors.success};

    color:
        ${({ theme }) =>
            theme.colors.success};

    font-size: 14px;
`;

/* =========================================================
   MAIN LAYOUT
========================================================= */

const Layout = styled.div`
    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        300px;

    gap: 20px;

    align-items: start;

    min-width: 0;

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

/* =========================================================
   CALENDAR
========================================================= */

const CalendarCard = styled(Card)`
    overflow: hidden;

    min-width: 0;
`;

const CalendarHeader = styled.div`
    display: grid;

    grid-template-columns:
        80px minmax(0, 1fr);

    border-bottom: 1px solid
        ${({ theme }) =>
            theme.colors.border};
`;

const TimeHeader = styled.div`
    padding: 12px;

    border-right: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    color:
        ${({ theme }) =>
            theme.colors.textSecondary};

    font-size: 12px;

    font-weight: 600;
`;

const DayHeader = styled.div`
    padding: 12px 16px;

    font-size: 14px;

    font-weight: 700;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
`;

const CalendarBody = styled.div`
    display: grid;

    grid-template-columns:
        80px minmax(0, 1fr);

    max-height: 720px;

    overflow-y: auto;
    overflow-x: hidden;

    min-width: 0;
`;

const TimeColumn = styled.div`
    border-right: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    background:
        ${({ theme }) =>
            theme.colors.surface};
`;

const TimeLabel = styled.div`
    height: 60px;

    box-sizing: border-box;

    padding: 6px 8px;

    border-bottom: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    color:
        ${({ theme }) =>
            theme.colors.textSecondary};

    font-size: 11px;

    text-align: right;
`;

const DayColumn = styled.div`
    position: relative;

    min-height: 1440px;

    min-width: 0;

    background:
        ${({ theme }) =>
            theme.colors.surface};
`;

const Slot = styled.div`
    height: 60px;

    box-sizing: border-box;

    border-bottom: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    pointer-events: none;
`;

/* =========================================================
   APPOINTMENT CARD

   Important:
   $left / $width allow overlapping appointments
   to occupy separate columns instead of stacking
   on top of each other.
========================================================= */

const Appointment = styled.div`
    position: absolute;

    top: ${({ $top }) =>
        `${$top}px`};

    left: ${({ $left }) =>
        `${$left}%`};

    width: ${({ $width }) =>
        `${$width}%`};

    height: ${({ $height }) =>
        `${$height}px`};

    box-sizing: border-box;

    min-height: 42px;

    padding: 8px 10px;

    border-left: 4px solid
        ${({ theme }) =>
            theme.colors.primary};

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ theme }) =>
            theme.colors.surfaceHover};

    box-shadow:
        ${({ theme }) =>
            theme.shadows.sm};

    cursor:
        ${({ $draggable }) =>
            $draggable
                ? "grab"
                : "default"};

    z-index: 3;

    overflow: hidden;

    transition:
        box-shadow 0.15s ease,
        transform 0.15s ease;

    &:hover {
        z-index: 20;

        transform:
            translateY(-1px);

        box-shadow:
            ${({ theme }) =>
                theme.shadows.md ||
                theme.shadows.sm};
    }

    &:active {
        cursor:
            ${({ $draggable }) =>
                $draggable
                    ? "grabbing"
                    : "default"};
    }
`;

const AppointmentPatient = styled.div`
    font-size: 13px;

    font-weight: 700;

    line-height: 1.25;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
`;

const AppointmentTime = styled.div`
    margin-top: 4px;

    font-size: 11px;

    line-height: 1.2;

    color:
        ${({ theme }) =>
            theme.colors.textSecondary};

    white-space: nowrap;
`;

const AppointmentProvider = styled.div`
    margin-top: 4px;

    font-size: 11px;

    line-height: 1.2;

    color:
        ${({ theme }) =>
            theme.colors.textSecondary};

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
`;

const Status = styled.span`
    display: inline-flex;

    align-items: center;

    width: fit-content;

    max-width: 100%;

    margin-top: 5px;

    padding: 3px 7px;

    border-radius: 999px;

    background:
        ${({ theme }) =>
            theme.colors.surface};

    color:
        ${({ theme }) =>
            theme.colors.textSecondary};

    font-size: 10px;

    font-weight: 700;

    text-transform: capitalize;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
`;

/* =========================================================
   SIDE AVAILABILITY CARD
========================================================= */

const SideCard = styled(Card)`
    padding: 18px;

    align-self: start;

    position: sticky;

    top: 20px;

    min-width: 0;

    @media (max-width: 1000px) {
        position: static;
    }
`;

const SideTitle = styled.h2`
    margin: 0 0 18px;

    font-size: 18px;
`;

const Field = styled.div`
    margin-bottom: 0;
`;

const Label = styled.label`
    display: block;

    margin-bottom: 7px;

    font-size: 13px;

    font-weight: 600;
`;

const AvailabilityButton = styled(Button)`
    width: 100%;

    margin-top: 18px;
`;

const AvailabilityError = styled(ErrorBox)`
    margin-top: 16px;
`;

const AvailabilityList = styled.div`
    display: flex;

    flex-direction: column;

    gap: 9px;

    margin-top: 18px;

    padding-top: 18px;

    border-top: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    max-height: 400px;

    overflow-y: auto;
`;

const AvailabilityItem = styled.div`
    display: grid;

    grid-template-columns:
        1fr auto 1fr;

    align-items: center;

    gap: 10px;

    min-height: 42px;

    padding: 9px 12px;

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ theme }) =>
            theme.colors.surface};

    font-size: 12px;

    transition:
        border-color 0.15s ease,
        background 0.15s ease;

    &:hover {
        border-color:
            ${({ theme }) =>
                theme.colors.primary};

        background:
            ${({ theme }) =>
                theme.colors.surfaceHover};
    }

    span:first-child {
        font-weight: 700;
    }

    span:nth-child(2) {
        color:
            ${({ theme }) =>
                theme.colors.textSecondary};

        text-align: center;
    }

    span:last-child {
        font-weight: 700;

        text-align: right;
    }
`;

const Empty = styled.div`
    padding: 40px 20px;

    text-align: center;

    color:
        ${({ theme }) =>
            theme.colors.textSecondary};

    font-size: 13px;
`;

/* =========================================================
   CONFIRM MODAL
========================================================= */

const ConfirmText = styled.p`
    line-height: 1.6;

    margin-top: 0;
`;

const ConfirmActions = styled.div`
    display: flex;

    justify-content: flex-end;

    gap: 8px;

    margin-top: 20px;
`;

const CancelButton = styled.button`
    min-height: 40px;

    padding: 9px 16px;

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ theme }) =>
            theme.colors.surface};

    color:
        ${({ theme }) =>
            theme.colors.text};

    cursor: pointer;

    &:disabled {
        opacity: 0.6;

        cursor: not-allowed;
    }
`;

const ConfirmButton = styled.button`
    min-height: 40px;

    padding: 9px 16px;

    border: none;

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ theme }) =>
            theme.colors.primary};

    color: white;

    cursor: pointer;

    &:disabled {
        opacity: 0.6;

        cursor: not-allowed;
    }
`;

/* =========================================================
   DATE / TIME HELPERS
========================================================= */

function pad(value) {
    return String(value).padStart(
        2,
        "0"
    );
}

function formatDate(date) {
    return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate())
    ].join("-");
}

function parseDate(value) {
    const [
        year,
        month,
        day
    ] = value
        .split("-")
        .map(Number);

    return new Date(
        year,
        month - 1,
        day
    );
}

function changeDate(
    value,
    amount
) {
    const date =
        parseDate(value);

    date.setDate(
        date.getDate() + amount
    );

    return formatDate(date);
}

function displayDate(value) {
    return parseDate(
        value
    ).toLocaleDateString(
        undefined,
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}

function timeToMinutes(value) {
    if (!value) {
        return 0;
    }

    const rawTime =
        value.includes("T")
            ? value.split("T")[1]
            : value.split(" ")[1] ||
              value;

    const time =
        rawTime.slice(0, 5);

    const [
        hours,
        minutes
    ] = time
        .split(":")
        .map(Number);

    if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes)
    ) {
        return 0;
    }

    return (
        hours * 60 +
        minutes
    );
}

function formatTime(value) {
    if (!value) {
        return "—";
    }

    const normalized =
        value.replace(
            " ",
            "T"
        );

    const date =
        new Date(normalized);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleTimeString(
        undefined,
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}

function backendDateTime(
    date,
    minutes
) {
    const safeMinutes =
        Math.max(
            0,
            Math.min(
                1439,
                minutes
            )
        );

    const hours =
        Math.floor(
            safeMinutes / 60
        );

    const mins =
        safeMinutes % 60;

    return `${date} ${pad(
        hours
    )}:${pad(mins)}:00`;
}

/*
 * IMPORTANT:
 *
 * This returns the REAL backend duration.
 *
 * We do NOT force it to 30 minutes because
 * drag/drop rescheduling must preserve the
 * appointment's actual duration.
 */
function getDuration(
    appointment
) {
    const start =
        timeToMinutes(
            appointment.start_at
        );

    const end =
        timeToMinutes(
            appointment.end_at
        );

    return Math.max(
        1,
        end - start
    );
}

/*
 * For visual display only.
 *
 * A 4-minute appointment should still have
 * enough height to be readable.
 */
function getDisplayHeight(
    appointment
) {
    return Math.max(
        42,
        getDuration(
            appointment
        )
    );
}

/* =========================================================
   OVERLAPPING APPOINTMENT LAYOUT
========================================================= */

/*
 * Two appointments overlap when:
 *
 * A.start < B.end
 * AND
 * A.end > B.start
 */
function appointmentsOverlap(
    first,
    second
) {
    const firstStart =
        timeToMinutes(
            first.start_at
        );

    const firstEnd =
        timeToMinutes(
            first.end_at
        );

    const secondStart =
        timeToMinutes(
            second.start_at
        );

    const secondEnd =
        timeToMinutes(
            second.end_at
        );

    return (
        firstStart <
            secondEnd &&
        firstEnd >
            secondStart
    );
}

/*
 * Creates groups of appointments that overlap.
 *
 * Example:
 *
 * 09:00 - 10:00
 * 09:30 - 10:30
 * 10:15 - 11:00
 *
 * The third overlaps the second, so all three
 * belong to one visual group.
 */
function buildOverlapGroups(
    appointments
) {
    const sorted =
        [...appointments].sort(
            (a, b) => {
                const startDifference =
                    timeToMinutes(
                        a.start_at
                    ) -
                    timeToMinutes(
                        b.start_at
                    );

                if (
                    startDifference !==
                    0
                ) {
                    return startDifference;
                }

                return (
                    timeToMinutes(
                        a.end_at
                    ) -
                    timeToMinutes(
                        b.end_at
                    )
                );
            }
        );

    const groups = [];

    sorted.forEach(
        (appointment) => {
            let matchingGroup =
                null;

            for (
                const group of groups
            ) {
                if (
                    group.some(
                        (
                            existing
                        ) =>
                            appointmentsOverlap(
                                appointment,
                                existing
                            )
                    )
                ) {
                    matchingGroup =
                        group;

                    break;
                }
            }

            if (
                !matchingGroup
            ) {
                matchingGroup = [];

                groups.push(
                    matchingGroup
                );
            }

            matchingGroup.push(
                appointment
            );
        }
    );

    return groups;
}

/*
 * Gives every appointment in an overlap group
 * its own lane.
 */
function buildAppointmentLayout(
    appointments
) {
    const groups =
        buildOverlapGroups(
            appointments
        );

    const layout = [];

    groups.forEach(
        (group) => {
            const lanes = [];

            const sortedGroup =
                [...group].sort(
                    (a, b) =>
                        timeToMinutes(
                            a.start_at
                        ) -
                            timeToMinutes(
                                b.start_at
                            ) ||
                        timeToMinutes(
                            a.end_at
                        ) -
                            timeToMinutes(
                                b.end_at
                            )
                );

            sortedGroup.forEach(
                (appointment) => {
                    const start =
                        timeToMinutes(
                            appointment.start_at
                        );

                    const end =
                        timeToMinutes(
                            appointment.end_at
                        );

                    let laneIndex =
                        -1;

                    for (
                        let i = 0;
                        i <
                        lanes.length;
                        i += 1
                    ) {
                        if (
                            lanes[i]
                                .end <=
                            start
                        ) {
                            laneIndex =
                                i;

                            break;
                        }
                    }

                    if (
                        laneIndex ===
                        -1
                    ) {
                        laneIndex =
                            lanes.length;

                        lanes.push({
                            end
                        });
                    } else {
                        lanes[
                            laneIndex
                        ].end = end;
                    }

                    layout.push({
                        appointment,
                        lane:
                            laneIndex
                    });
                }
            );

            const laneCount =
                Math.max(
                    1,
                    lanes.length
                );

            layout.forEach(
                (item) => {
                    if (
                        group.includes(
                            item.appointment
                        )
                    ) {
                        item.laneCount =
                            laneCount;
                    }
                }
            );
        }
    );

    return layout;
}

/* =========================================================
   PAGE
========================================================= */

function CalendarPage() {
    const {
        appointments,
        providers,
        availability,

        loading,
        availabilityLoading,
        rescheduling,

        error,
        availabilityError,
        successMessage,

        getByDate,
        getProviders,
        getAvailability,
        rescheduleAppointment,

        clearError,
        clearSuccess
    } = useCalendar();

    const today =
        formatDate(
            new Date()
        );

    const [
        selectedDate,
        setSelectedDate
    ] = useState(today);

    const [
        selectedProvider,
        setSelectedProvider
    ] = useState("");

    const [
        draggedAppointment,
        setDraggedAppointment
    ] = useState(null);

    const [
        pendingReschedule,
        setPendingReschedule
    ] = useState(null);

    const [
        confirmOpen,
        setConfirmOpen
    ] = useState(false);

    /* =====================================================
       LOAD CALENDAR
    ===================================================== */

    useEffect(() => {
        clearError();

        getByDate(
            selectedDate
        );
    }, [
        selectedDate,
        getByDate,
        clearError
    ]);

    /* =====================================================
       LOAD PROVIDERS
    ===================================================== */

    useEffect(() => {
        getProviders();
    }, [
        getProviders
    ]);

    /* =====================================================
       CLEAR SUCCESS MESSAGE
    ===================================================== */

    useEffect(() => {
        if (
            !successMessage
        ) {
            return undefined;
        }

        const timer =
            setTimeout(
                () => {
                    clearSuccess();
                },
                3500
            );

        return () =>
            clearTimeout(timer);
    }, [
        successMessage,
        clearSuccess
    ]);

    /* =====================================================
       FILTER APPOINTMENTS
    ===================================================== */

    const filteredAppointments =
        useMemo(() => {
            if (
                !selectedProvider
            ) {
                return appointments;
            }

            return appointments.filter(
                (appointment) =>
                    String(
                        appointment.provider_id
                    ) ===
                    String(
                        selectedProvider
                    )
            );
        }, [
            appointments,
            selectedProvider
        ]);

    /* =====================================================
       CALCULATE VISUAL APPOINTMENT LANES
    ===================================================== */

    const appointmentLayout =
        useMemo(
            () =>
                buildAppointmentLayout(
                    filteredAppointments
                ),
            [
                filteredAppointments
            ]
        );

    /* =====================================================
       DRAG / DROP
    ===================================================== */

    const handleDragStart =
        (
            event,
            appointment
        ) => {
            setDraggedAppointment(
                appointment
            );

            event.dataTransfer.effectAllowed =
                "move";

            event.dataTransfer.setData(
                "text/plain",
                String(
                    appointment.id
                )
            );
        };

    const handleDrop =
        (event) => {
            event.preventDefault();

            if (
                !draggedAppointment
            ) {
                return;
            }

            const rect =
                event.currentTarget.getBoundingClientRect();

            const offsetY =
                event.clientY -
                rect.top;

            /*
             * Calendar scale:
             *
             * 60 pixels = 60 minutes.
             *
             * Therefore every pixel represents
             * one minute.
             *
             * We snap to 15-minute intervals.
             */
            const rawMinutes =
                offsetY;

            let minutes =
                Math.round(
                    rawMinutes / 15
                ) * 15;

            const duration =
                getDuration(
                    draggedAppointment
                );

            minutes =
                Math.max(
                    0,
                    Math.min(
                        1440 -
                            duration,
                        minutes
                    )
                );

            const newStart =
                backendDateTime(
                    selectedDate,
                    minutes
                );

            const newEnd =
                backendDateTime(
                    selectedDate,
                    minutes +
                        duration
                );

            if (
                newStart ===
                    draggedAppointment.start_at &&
                newEnd ===
                    draggedAppointment.end_at
            ) {
                setDraggedAppointment(
                    null
                );

                return;
            }

            setPendingReschedule({
                appointment:
                    draggedAppointment,

                newStartAt:
                    newStart,

                newEndAt:
                    newEnd
            });

            setConfirmOpen(
                true
            );

            setDraggedAppointment(
                null
            );
        };

    const handleDragEnd =
        () => {
            setDraggedAppointment(
                null
            );
        };

    /* =====================================================
       CONFIRM RESCHEDULE
    ===================================================== */

    const confirmReschedule =
        () => {
            if (
                !pendingReschedule
            ) {
                return;
            }

            rescheduleAppointment({
                ...pendingReschedule.appointment,

                start_at:
                    pendingReschedule.newStartAt,

                end_at:
                    pendingReschedule.newEndAt
            });

            setConfirmOpen(
                false
            );

            setPendingReschedule(
                null
            );
        };

    const closeConfirm =
        () => {
            if (
                rescheduling
            ) {
                return;
            }

            setConfirmOpen(
                false
            );

            setPendingReschedule(
                null
            );

            setDraggedAppointment(
                null
            );
        };

    /* =====================================================
       AVAILABILITY
    ===================================================== */

    const checkAvailability =
        () => {
            if (
                !selectedProvider
            ) {
                return;
            }

            getAvailability({
                providerId:
                    selectedProvider,

                date:
                    selectedDate,

                startTime:
                    "09:00",

                endTime:
                    "17:00",

                slotMinutes:
                    30
            });
        };

    return (
        <Page>
            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <Header>
                <HeaderContent>
                    <Title>
                        Calendar
                    </Title>

                    <Subtitle>
                        View appointments,
                        provider schedules
                        and availability.
                    </Subtitle>
                </HeaderContent>

                <Button
                    type="button"
                    onClick={() =>
                        setSelectedDate(
                            today
                        )
                    }
                >
                    Today
                </Button>
            </Header>

            {/* =================================================
                ERROR / SUCCESS
            ================================================= */}

            {error && (
                <ErrorBox>
                    {error}
                </ErrorBox>
            )}

            {successMessage && (
                <SuccessBox>
                    {successMessage}
                </SuccessBox>
            )}

            {/* =================================================
                SINGLE-LINE TOOLBAR
            ================================================= */}

            <Toolbar>
                <ToolbarGroup>
                    <Button
                        type="button"
                        onClick={() =>
                            setSelectedDate(
                                changeDate(
                                    selectedDate,
                                    -1
                                )
                            )
                        }
                    >
                        ← Previous
                    </Button>

                    <DateInput
                        type="date"
                        value={
                            selectedDate
                        }
                        onChange={(
                            event
                        ) =>
                            setSelectedDate(
                                event.target
                                    .value
                            )
                        }
                    />

                    <Button
                        type="button"
                        onClick={() =>
                            setSelectedDate(
                                changeDate(
                                    selectedDate,
                                    1
                                )
                            )
                        }
                    >
                        Next →
                    </Button>
                </ToolbarGroup>

                <ToolbarDate
                    title={displayDate(
                        selectedDate
                    )}
                >
                    {displayDate(
                        selectedDate
                    )}
                </ToolbarDate>

                <ToolbarGroup>
                    <Select
                        value={
                            selectedProvider
                        }
                        onChange={(
                            event
                        ) =>
                            setSelectedProvider(
                                event.target
                                    .value
                            )
                        }
                    >
                        <option value="">
                            All providers
                        </option>

                        {providers.map(
                            (provider) => (
                                <option
                                    key={
                                        provider.id
                                    }
                                    value={
                                        provider.id
                                    }
                                >
                                    {
                                        provider.name
                                    }
                                </option>
                            )
                        )}
                    </Select>
                </ToolbarGroup>
            </Toolbar>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <Layout>
                {/* =================================================
                    CALENDAR
                ================================================= */}

                <CalendarCard>
                    <CalendarHeader>
                        <TimeHeader>
                            Time
                        </TimeHeader>

                        <DayHeader>
                            {displayDate(
                                selectedDate
                            )}
                        </DayHeader>
                    </CalendarHeader>

                    {loading ? (
                        <Empty>
                            <Loader />
                        </Empty>
                    ) : (
                        <CalendarBody>
                            {/* TIME COLUMN */}

                            <TimeColumn>
                                {Array.from(
                                    {
                                        length: 24
                                    },
                                    (
                                        _,
                                        hour
                                    ) => (
                                        <TimeLabel
                                            key={
                                                hour
                                            }
                                        >
                                            {pad(
                                                hour
                                            )}
                                            :00
                                        </TimeLabel>
                                    )
                                )}
                            </TimeColumn>

                            {/* DAY COLUMN */}

                            <DayColumn
                                onDragOver={(
                                    event
                                ) => {
                                    event.preventDefault();

                                    event.dataTransfer.dropEffect =
                                        "move";
                                }}
                                onDrop={
                                    handleDrop
                                }
                            >
                                {/* HOURLY GRID */}

                                {Array.from(
                                    {
                                        length: 24
                                    },
                                    (
                                        _,
                                        index
                                    ) => (
                                        <Slot
                                            key={
                                                index
                                            }
                                        />
                                    )
                                )}

                                {/* APPOINTMENTS */}

                                {appointmentLayout.map(
                                    ({
                                        appointment,
                                        lane,
                                        laneCount
                                    }) => {
                                        const start =
                                            timeToMinutes(
                                                appointment.start_at
                                            );

                                        const displayHeight =
                                            getDisplayHeight(
                                                appointment
                                            );

                                        const draggable =
                                            appointment.status !==
                                                "cancelled" &&
                                            appointment.status !==
                                                "completed";

                                        /*
                                         * Small gap between lanes.
                                         *
                                         * Example:
                                         *
                                         * laneCount = 2
                                         *
                                         * lane 1:
                                         * 0% -> 49%
                                         *
                                         * lane 2:
                                         * 51% -> 49%
                                         */

                                        const laneGap =
                                            1;

                                        const totalGap =
                                            laneGap *
                                            (
                                                laneCount -
                                                1
                                            );

                                        const width =
                                            (
                                                100 -
                                                totalGap
                                            ) /
                                            laneCount;

                                        const left =
                                            lane *
                                                (
                                                    width +
                                                    laneGap
                                                );

                                        return (
                                            <Appointment
                                                key={
                                                    appointment.id
                                                }
                                                $top={
                                                    start
                                                }
                                                $height={
                                                    displayHeight
                                                }
                                                $left={
                                                    left
                                                }
                                                $width={
                                                    width
                                                }
                                                $draggable={
                                                    draggable
                                                }
                                                draggable={
                                                    draggable
                                                }
                                                onDragStart={(
                                                    event
                                                ) =>
                                                    handleDragStart(
                                                        event,
                                                        appointment
                                                    )
                                                }
                                                onDragEnd={
                                                    handleDragEnd
                                                }
                                            >
                                                <AppointmentPatient>
                                                    {appointment.patient_name ||
                                                        `Patient #${appointment.patient_id}`}
                                                </AppointmentPatient>

                                                <AppointmentTime>
                                                    {formatTime(
                                                        appointment.start_at
                                                    )}

                                                    {" – "}

                                                    {formatTime(
                                                        appointment.end_at
                                                    )}
                                                </AppointmentTime>

                                                <AppointmentProvider>
                                                    {appointment.provider_name ||
                                                        `Provider #${appointment.provider_id}`}
                                                </AppointmentProvider>

                                                <Status>
                                                    {
                                                        appointment.status
                                                    }
                                                </Status>
                                            </Appointment>
                                        );
                                    }
                                )}

                                {/* EMPTY STATE */}

                                {!filteredAppointments.length && (
                                    <Empty>
                                        No appointments
                                        found for
                                        this date.
                                    </Empty>
                                )}
                            </DayColumn>
                        </CalendarBody>
                    )}
                </CalendarCard>

                {/* =================================================
                    AVAILABILITY
                ================================================= */}

                <SideCard>
                    <SideTitle>
                        Provider Availability
                    </SideTitle>

                    <Field>
                        <Label>
                            Provider
                        </Label>

                        <Select
                            value={
                                selectedProvider
                            }
                            onChange={(
                                event
                            ) =>
                                setSelectedProvider(
                                    event.target
                                        .value
                                )
                            }
                        >
                            <option value="">
                                Select provider
                            </option>

                            {providers.map(
                                (provider) => (
                                    <option
                                        key={
                                            provider.id
                                        }
                                        value={
                                            provider.id
                                        }
                                    >
                                        {
                                            provider.name
                                        }
                                    </option>
                                )
                            )}
                        </Select>
                    </Field>

                    <AvailabilityButton
                        type="button"
                        onClick={
                            checkAvailability
                        }
                        disabled={
                            !selectedProvider ||
                            availabilityLoading
                        }
                    >
                        {availabilityLoading
                            ? "Loading..."
                            : "Check availability"}
                    </AvailabilityButton>

                    {availabilityError && (
                        <AvailabilityError>
                            {
                                availabilityError
                            }
                        </AvailabilityError>
                    )}

                    {availabilityLoading ? (
                        <Empty>
                            <Loader />
                        </Empty>
                    ) : availability.length >
                      0 ? (
                        <AvailabilityList>
                            {availability.map(
                                (
                                    slot,
                                    index
                                ) => (
                                    <AvailabilityItem
                                        key={`${slot.start_time}-${slot.end_time}-${index}`}
                                    >
                                        <span>
                                            {
                                                slot.start_time
                                            }
                                        </span>

                                        <span>
                                            →
                                        </span>

                                        <span>
                                            {
                                                slot.end_time
                                            }
                                        </span>
                                    </AvailabilityItem>
                                )
                            )}
                        </AvailabilityList>
                    ) : (
                        <Empty>
                            Select a provider
                            and check
                            availability.
                        </Empty>
                    )}
                </SideCard>
            </Layout>

            {/* =================================================
                RESCHEDULE CONFIRMATION
            ================================================= */}

            <Modal
                isOpen={
                    confirmOpen
                }
                onClose={
                    closeConfirm
                }
                title="Confirm reschedule"
            >
                <ConfirmText>
                    Reschedule{" "}
                    <strong>
                        {pendingReschedule
                            ?.appointment
                            ?.patient_name ||
                            `Appointment #${pendingReschedule?.appointment?.id}`}
                    </strong>
                    ?

                    <br />
                    <br />

                    New time:

                    <strong>
                        {" "}

                        {pendingReschedule
                            ? formatTime(
                                  pendingReschedule.newStartAt
                              )
                            : ""}

                        {" – "}

                        {pendingReschedule
                            ? formatTime(
                                  pendingReschedule.newEndAt
                              )
                            : ""}
                    </strong>

                    <br />
                    <br />

                    The backend will check
                    provider availability
                    and reject the
                    operation if there is
                    a conflict.
                </ConfirmText>

                <ConfirmActions>
                    <CancelButton
                        type="button"
                        disabled={
                            rescheduling
                        }
                        onClick={
                            closeConfirm
                        }
                    >
                        Cancel
                    </CancelButton>

                    <ConfirmButton
                        type="button"
                        disabled={
                            rescheduling
                        }
                        onClick={
                            confirmReschedule
                        }
                    >
                        {rescheduling
                            ? "Rescheduling..."
                            : "Confirm reschedule"}
                    </ConfirmButton>
                </ConfirmActions>
            </Modal>
        </Page>
    );
}

export default CalendarPage;