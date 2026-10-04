import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../modules/auth/hooks/useAuth";
import useChat from "../../modules/chat/hooks/useChat";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";

const PageContainer =
    styled.div`
        display: flex;
        flex-direction: column;

        gap: ${({ theme }) =>
            theme.spacing.lg};

        width: 100%;
        max-width:
            ${({ theme }) =>
                theme.layout.contentMaxWidth};

        margin: 0 auto;
    `;

const PageHeader =
    styled.div`
        display: flex;

        align-items: flex-start;

        justify-content:
            space-between;

        gap: ${({ theme }) =>
            theme.spacing.md};

        @media (max-width: 700px) {
            flex-direction: column;
        }
    `;

const PageTitle =
    styled.h1`
        margin: 0;

        color:
            ${({ theme }) =>
                theme.colors.text};

        font-size:
            ${({ theme }) =>
                theme.typography.h1};
    `;

const PageSubtitle =
    styled.p`
        margin:
            ${({ theme }) =>
                theme.spacing.xs}
            0 0;

        color:
            ${({ theme }) =>
                theme.colors.textSecondary};

        font-size:
            ${({ theme }) =>
                theme.typography.body};
    `;

const AppointmentSelector =
    styled.section`
        display: flex;

        align-items: flex-end;

        gap: ${({ theme }) =>
            theme.spacing.md};

        padding:
            ${({ theme }) =>
                theme.spacing.lg};

        background:
            ${({ theme }) =>
                theme.colors.surface};

        border:
            1px solid
            ${({ theme }) =>
                theme.colors.border};

        border-radius:
            ${({ theme }) =>
                theme.radius.lg};

        box-shadow:
            ${({ theme }) =>
                theme.shadows.sm};

        @media (max-width: 700px) {
            flex-direction: column;
            align-items: stretch;
        }
    `;

const SelectorField =
    styled.div`
        display: flex;

        flex-direction: column;

        gap: ${({ theme }) =>
            theme.spacing.xs};

        flex: 1;
    `;

const Label =
    styled.label`
        color:
            ${({ theme }) =>
                theme.colors.text};

        font-size:
            ${({ theme }) =>
                theme.typography.small};

        font-weight: 600;
    `;

const MainCard =
    styled.section`
        display: flex;

        flex-direction: column;

        min-height: 650px;

        background:
            ${({ theme }) =>
                theme.colors.surface};

        border:
            1px solid
            ${({ theme }) =>
                theme.colors.border};

        border-radius:
            ${({ theme }) =>
                theme.radius.lg};

        box-shadow:
            ${({ theme }) =>
                theme.shadows.md};

        overflow: hidden;
    `;

const Tabs =
    styled.div`
        display: flex;

        gap: ${({ theme }) =>
            theme.spacing.xs};

        padding:
            ${({ theme }) =>
                theme.spacing.sm};

        border-bottom:
            1px solid
            ${({ theme }) =>
                theme.colors.border};

        background:
            ${({ theme }) =>
                theme.colors.surfaceHover};
    `;

const Tab =
    styled.button`
        min-height: 40px;

        padding:
            8px 16px;

        border: none;

        border-radius:
            ${({ theme }) =>
                theme.radius.md};

        background:
            ${({ active, theme }) =>
                active
                    ? theme.colors.primary
                    : "transparent"};

        color:
            ${({ active, theme }) =>
                active
                    ? "#FFFFFF"
                    : theme.colors.textSecondary};

        font-size:
            ${({ theme }) =>
                theme.typography.body};

        font-weight: 600;

        cursor: pointer;

        transition:
            background 0.2s ease,
            color 0.2s ease;

        &:hover {
            background:
                ${({ active, theme }) =>
                    active
                        ? theme.colors.primaryHover
                        : theme.colors.surface};

            color:
                ${({ active, theme }) =>
                    active
                        ? "#FFFFFF"
                        : theme.colors.text};
        }
    `;

const Content =
    styled.div`
        display: flex;

        flex-direction: column;

        flex: 1;

        min-height: 0;
    `;

const ContentHeader =
    styled.div`
        display: flex;

        align-items: center;

        justify-content:
            space-between;

        gap: ${({ theme }) =>
            theme.spacing.md};

        padding:
            ${({ theme }) =>
                theme.spacing.md};

        border-bottom:
            1px solid
            ${({ theme }) =>
                theme.colors.border};

        @media (max-width: 600px) {
            align-items: flex-start;
            flex-direction: column;
        }
    `;

const ContentTitle =
    styled.h2`
        margin: 0;

        color:
            ${({ theme }) =>
                theme.colors.text};

        font-size:
            ${({ theme }) =>
                theme.typography.h2};
    `;

const ContentSubtitle =
    styled.p`
        margin:
            ${({ theme }) =>
                theme.spacing.xs}
            0 0;

        color:
            ${({ theme }) =>
                theme.colors.textSecondary};

        font-size:
            ${({ theme }) =>
                theme.typography.small};
    `;

const ScrollArea =
    styled.div`
        flex: 1;

        min-height: 360px;

        max-height: 500px;

        overflow-y: auto;

        padding:
            ${({ theme }) =>
                theme.spacing.lg};

        background:
            ${({ theme }) =>
                theme.colors.background};

        display: flex;

        flex-direction: column;

        gap:
            ${({ theme }) =>
                theme.spacing.md};
    `;

const MessageRow =
    styled.div`
        display: flex;

        justify-content:
            ${({ mine }) =>
                mine
                    ? "flex-end"
                    : "flex-start"};

        width: 100%;
    `;

const MessageBubble =
    styled.div`
        width: fit-content;

        max-width: 75%;

        padding:
            ${({ theme }) =>
                theme.spacing.md};

        background:
            ${({ mine, theme }) =>
                mine
                    ? theme.colors.primary
                    : theme.colors.surface};

        color:
            ${({ mine, theme }) =>
                mine
                    ? "#FFFFFF"
                    : theme.colors.text};

        border:
            1px solid
            ${({ mine, theme }) =>
                mine
                    ? theme.colors.primary
                    : theme.colors.border};

        border-radius:
            ${({ theme }) =>
                theme.radius.lg};

        box-shadow:
            ${({ theme }) =>
                theme.shadows.sm};

        @media (max-width: 600px) {
            max-width: 90%;
        }
    `;

const MessageSender =
    styled.div`
        margin-bottom:
            ${({ theme }) =>
                theme.spacing.xs};

        font-size:
            ${({ theme }) =>
                theme.typography.small};

        font-weight: 600;

        opacity: 0.8;
    `;

const MessageContent =
    styled.div`
        white-space: pre-wrap;

        word-break: break-word;

        line-height: 1.5;
    `;

const MessageTime =
    styled.div`
        margin-top:
            ${({ theme }) =>
                theme.spacing.xs};

        font-size:
            11px;

        opacity: 0.7;

        text-align:
            ${({ mine }) =>
                mine
                    ? "right"
                    : "left"};
    `;

const Composer =
    styled.div`
        display: flex;

        align-items: flex-end;

        gap: ${({ theme }) =>
            theme.spacing.sm};

        padding:
            ${({ theme }) =>
                theme.spacing.md};

        border-top:
            1px solid
            ${({ theme }) =>
                theme.colors.border};

        background:
            ${({ theme }) =>
                theme.colors.surface};
    `;

const MessageInput =
    styled.textarea`
        flex: 1;

        min-height: 44px;

        max-height: 140px;

        resize: vertical;

        padding:
            11px 12px;

        border:
            1px solid
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

        font-family:
            ${({ theme }) =>
                theme.typography.fontFamily};

        font-size:
            ${({ theme }) =>
                theme.typography.body};

        &:focus {
            outline: none;

            border-color:
                ${({ theme }) =>
                    theme.colors.primary};

            box-shadow:
                0 0 0 3px
                rgba(
                    15,
                    118,
                    110,
                    0.12
                );
        }

        &:disabled {
            opacity: 0.6;
        }
    `;

const NoteComposer =
    styled.div`
        display: flex;

        flex-direction: column;

        gap: ${({ theme }) =>
            theme.spacing.md};

        padding:
            ${({ theme }) =>
                theme.spacing.lg};

        border-top:
            1px solid
            ${({ theme }) =>
                theme.colors.border};

        background:
            ${({ theme }) =>
                theme.colors.surface};
    `;

const NoteInput =
    styled.textarea`
        width: 100%;

        min-height: 120px;

        resize: vertical;

        padding:
            12px;

        border:
            1px solid
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

        font-family:
            ${({ theme }) =>
                theme.typography.fontFamily};

        font-size:
            ${({ theme }) =>
                theme.typography.body};

        &:focus {
            outline: none;

            border-color:
                ${({ theme }) =>
                    theme.colors.primary};

            box-shadow:
                0 0 0 3px
                rgba(
                    15,
                    118,
                    110,
                    0.12
                );
        }
    `;

const NoteCard =
    styled.article`
        padding:
            ${({ theme }) =>
                theme.spacing.lg};

        background:
            ${({ theme }) =>
                theme.colors.surface};

        border:
            1px solid
            ${({ theme }) =>
                theme.colors.border};

        border-radius:
            ${({ theme }) =>
                theme.radius.md};

        box-shadow:
            ${({ theme }) =>
                theme.shadows.sm};
    `;

const NoteHeader =
    styled.div`
        display: flex;

        align-items: flex-start;

        justify-content:
            space-between;

        gap: ${({ theme }) =>
            theme.spacing.md};

        margin-bottom:
            ${({ theme }) =>
                theme.spacing.sm};

        @media (max-width: 600px) {
            flex-direction: column;
        }
    `;

const NoteAuthor =
    styled.div`
        color:
            ${({ theme }) =>
                theme.colors.text};

        font-weight: 600;
    `;

const NoteDate =
    styled.div`
        color:
            ${({ theme }) =>
                theme.colors.textSecondary};

        font-size:
            ${({ theme }) =>
                theme.typography.small};
    `;

const NoteBody =
    styled.div`
        color:
            ${({ theme }) =>
                theme.colors.text};

        line-height: 1.6;

        white-space: pre-wrap;

        word-break: break-word;
    `;

const EmptyState =
    styled.div`
        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        flex: 1;

        min-height: 300px;

        padding:
            ${({ theme }) =>
                theme.spacing.xl};

        text-align: center;
    `;

const EmptyTitle =
    styled.h3`
        margin: 0 0
            ${({ theme }) =>
                theme.spacing.xs};

        color:
            ${({ theme }) =>
                theme.colors.text};
    `;

const EmptyText =
    styled.p`
        margin: 0;

        max-width: 480px;

        color:
            ${({ theme }) =>
                theme.colors.textSecondary};

        line-height: 1.6;
    `;

const ErrorBox =
    styled.div`
        padding:
            ${({ theme }) =>
                theme.spacing.md};

        border:
            1px solid
            ${({ theme }) =>
                theme.colors.danger};

        border-radius:
            ${({ theme }) =>
                theme.radius.md};

        background:
            rgba(
                220,
                38,
                38,
                0.06
            );

        color:
            ${({ theme }) =>
                theme.colors.danger};

        font-size:
            ${({ theme }) =>
                theme.typography.body};
    `;

const SuccessBox =
    styled.div`
        padding:
            ${({ theme }) =>
                theme.spacing.md};

        border:
            1px solid
            ${({ theme }) =>
                theme.colors.success};

        border-radius:
            ${({ theme }) =>
                theme.radius.md};

        background:
            rgba(
                22,
                163,
                74,
                0.06
            );

        color:
            ${({ theme }) =>
                theme.colors.success};

        font-size:
            ${({ theme }) =>
                theme.typography.body};
    `;

const HeaderActions =
    styled.div`
        display: flex;

        gap: ${({ theme }) =>
            theme.spacing.sm};

        flex-wrap: wrap;
    `;

const SecondaryButton =
    styled(Button)`
        background:
            transparent;

        color:
            ${({ theme }) =>
                theme.colors.primary};

        border:
            1px solid
            ${({ theme }) =>
                theme.colors.primary};

        &:hover:not(:disabled) {
            background:
                ${({ theme }) =>
                    theme.colors.primary};

            color: #ffffff;
        }
    `;

const TextButton =
    styled.button`
        border: none;

        background: transparent;

        color:
            ${({ theme }) =>
                theme.colors.primary};

        font-size:
            ${({ theme }) =>
                theme.typography.small};

        font-weight: 600;

        cursor: pointer;

        &:hover {
            text-decoration:
                underline;
        }
    `;

function formatDateTime(
    value
) {
    if (!value) {
        return "";
    }

    const date =
        new Date(
            String(value).replace(
                " ",
                "T"
            )
        );

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleString(
        undefined,
        {
            dateStyle:
                "medium",
            timeStyle:
                "short"
        }
    );
}

function CommunicationPage() {
    const {
        user
    } = useAuth();

    const {
        notes,
        messages,

        currentAppointmentId,

        loadingNotes,
        loadingMessages,

        sendingNote,
        sendingMessage,

        error,
        notesError,
        messagesError,

        successMessage,

        getNotes,
        createNote,

        getMessages,
        sendMessage,

        clearError,
        clearSuccess,
        resetChat
    } = useChat();

    const roles =
        user?.roles || [];

    const canCreateNotes =
        roles.includes(
            "Admin"
        ) ||
        roles.includes(
            "Provider"
        ) ||
        roles.includes(
            "Nurse"
        );

    const currentUserId =
        Number(
            user?.id ??
            user?.user_id ??
            user?.userId ??
            user?.sub ??
            0
        );

    const [
        appointmentIdInput,
        setAppointmentIdInput
    ] = useState("");

    const [
        activeTab,
        setActiveTab
    ] = useState(
        "messages"
    );

    const [
        messageText,
        setMessageText
    ] = useState("");

    const [
        noteText,
        setNoteText
    ] = useState("");

    const [
        loadedAppointmentId,
        setLoadedAppointmentId
    ] = useState(null);

    const appointmentId =
        Number(
            appointmentIdInput
        );

    const hasAppointment =
        Number.isInteger(
            appointmentId
        ) &&
        appointmentId > 0;

    const sortedMessages =
        useMemo(() => {
            return [
                ...messages
            ].sort(
                (
                    first,
                    second
                ) => {
                    return (
                        new Date(
                            String(
                                first.created_at ||
                                    ""
                            ).replace(
                                " ",
                                "T"
                            )
                        ).getTime() -
                        new Date(
                            String(
                                second.created_at ||
                                    ""
                            ).replace(
                                " ",
                                "T"
                            )
                        ).getTime()
                    );
                }
            );
        }, [messages]);

    const sortedNotes =
        useMemo(() => {
            return [
                ...notes
            ].sort(
                (
                    first,
                    second
                ) => {
                    return (
                        new Date(
                            String(
                                first.created_at ||
                                    ""
                            ).replace(
                                " ",
                                "T"
                            )
                        ).getTime() -
                        new Date(
                            String(
                                second.created_at ||
                                    ""
                            ).replace(
                                " ",
                                "T"
                            )
                        ).getTime()
                    );
                }
            );
        }, [notes]);

    const loadCommunication =
        () => {
            clearError();

            clearSuccess();

            if (
                !hasAppointment
            ) {
                return;
            }

            setLoadedAppointmentId(
                appointmentId
            );

            getMessages(
                appointmentId
            );

            getNotes(
                appointmentId
            );
        };

    useEffect(() => {
        return () => {
            resetChat();
        };
    }, [
        resetChat
    ]);

    const handleSendMessage =
        (event) => {
            event.preventDefault();

            if (
                !hasAppointment ||
                !messageText.trim() ||
                sendingMessage
            ) {
                return;
            }

            clearError();

            sendMessage({
                appointment_id:
                    appointmentId,

                content:
                    messageText.trim()
            });

            setMessageText("");
        };

    const handleCreateNote =
        (event) => {
            event.preventDefault();

            if (
                !hasAppointment ||
                !noteText.trim() ||
                sendingNote
            ) {
                return;
            }

            clearError();

            createNote({
                appointment_id:
                    appointmentId,

                content:
                    noteText.trim()
            });

            setNoteText("");
        };

    useEffect(() => {
        if (
            successMessage &&
            loadedAppointmentId
        ) {
            if (
                activeTab ===
                "messages"
            ) {
                getMessages(
                    loadedAppointmentId
                );
            }

            if (
                activeTab ===
                "notes"
            ) {
                getNotes(
                    loadedAppointmentId
                );
            }

            const timer =
                setTimeout(
                    () => {
                        clearSuccess();
                    },
                    2500
                );

            return () =>
                clearTimeout(
                    timer
                );
        }
    }, [
        successMessage,
        loadedAppointmentId,
        activeTab,
        getMessages,
        getNotes,
        clearSuccess
    ]);

    return (
        <PageContainer>
            <PageHeader>
                <div>
                    <PageTitle>
                        Communication
                    </PageTitle>

                    <PageSubtitle>
                        Secure messaging and
                        appointment-specific
                        internal notes.
                    </PageSubtitle>
                </div>

                <HeaderActions>
                    {hasAppointment && (
                        <SecondaryButton
                            type="button"
                            onClick={
                                loadCommunication
                            }
                            disabled={
                                loadingMessages ||
                                loadingNotes
                            }
                        >
                            Refresh
                        </SecondaryButton>
                    )}
                </HeaderActions>
            </PageHeader>

            <AppointmentSelector>
                <SelectorField>
                    <Label htmlFor="communication-appointment">
                        Appointment ID
                    </Label>

                    <Input
                        id="communication-appointment"
                        type="number"
                        min="1"
                        placeholder="Enter appointment ID"
                        value={
                            appointmentIdInput
                        }
                        onChange={(
                            event
                        ) =>
                            setAppointmentIdInput(
                                event
                                    .target
                                    .value
                            )
                        }
                        onKeyDown={(
                            event
                        ) => {
                            if (
                                event.key ===
                                "Enter"
                            ) {
                                loadCommunication();
                            }
                        }}
                    />
                </SelectorField>

                <Button
                    type="button"
                    onClick={
                        loadCommunication
                    }
                    disabled={
                        !hasAppointment ||
                        loadingMessages ||
                        loadingNotes
                    }
                >
                    Open Conversation
                </Button>
            </AppointmentSelector>

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

            <MainCard>
                <Tabs>
                    <Tab
                        type="button"
                        active={
                            activeTab ===
                            "messages"
                        }
                        onClick={() =>
                            setActiveTab(
                                "messages"
                            )
                        }
                    >
                        Messages
                    </Tab>

                    <Tab
                        type="button"
                        active={
                            activeTab ===
                            "notes"
                        }
                        onClick={() =>
                            setActiveTab(
                                "notes"
                            )
                        }
                    >
                        Internal Notes
                    </Tab>
                </Tabs>

                {!hasAppointment && (
                    <EmptyState>
                        <EmptyTitle>
                            Select an appointment
                        </EmptyTitle>

                        <EmptyText>
                            Enter an appointment ID
                            above to load the
                            message history and
                            internal notes for that
                            appointment.
                        </EmptyText>
                    </EmptyState>
                )}

                {hasAppointment &&
                    activeTab ===
                        "messages" && (
                        <Content>
                            <ContentHeader>
                                <div>
                                    <ContentTitle>
                                        Messages
                                    </ContentTitle>

                                    <ContentSubtitle>
                                        Appointment #
                                        {
                                            appointmentId
                                        }
                                    </ContentSubtitle>
                                </div>

                                {loadedAppointmentId ===
                                    appointmentId && (
                                    <TextButton
                                        type="button"
                                        onClick={() =>
                                            getMessages(
                                                appointmentId
                                            )
                                        }
                                    >
                                        Reload
                                    </TextButton>
                                )}
                            </ContentHeader>

                            {messagesError && (
                                <ErrorBox>
                                    {
                                        messagesError
                                    }
                                </ErrorBox>
                            )}

                            {loadingMessages ? (
                                <EmptyState>
                                    <Loader />
                                </EmptyState>
                            ) : sortedMessages.length ===
                              0 ? (
                                <EmptyState>
                                    <EmptyTitle>
                                        No messages yet
                                    </EmptyTitle>

                                    <EmptyText>
                                        Start the
                                        conversation
                                        using the
                                        message box
                                        below.
                                    </EmptyText>
                                </EmptyState>
                            ) : (
                                <ScrollArea>
                                    {sortedMessages.map(
                                        (
                                            message
                                        ) => {
                                            const mine =
                                                currentUserId >
                                                    0 &&
                                                Number(
                                                    message.sender_id
                                                ) ===
                                                    currentUserId;

                                            return (
                                                <MessageRow
                                                    key={
                                                        message.id
                                                    }
                                                    mine={
                                                        mine
                                                    }
                                                >
                                                    <MessageBubble
                                                        mine={
                                                            mine
                                                        }
                                                    >
                                                        <MessageSender>
                                                            {mine
                                                                ? "You"
                                                                : message.sender_name ||
                                                                  `User #${message.sender_id}`}
                                                        </MessageSender>

                                                        <MessageContent>
                                                            {
                                                                message.content
                                                            }
                                                        </MessageContent>

                                                        <MessageTime
                                                            mine={
                                                                mine
                                                            }
                                                        >
                                                            {formatDateTime(
                                                                message.created_at
                                                            )}
                                                        </MessageTime>
                                                    </MessageBubble>
                                                </MessageRow>
                                            );
                                        }
                                    )}
                                </ScrollArea>
                            )}

                            <form
                                onSubmit={
                                    handleSendMessage
                                }
                            >
                                <Composer>
                                    <MessageInput
                                        value={
                                            messageText
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setMessageText(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Type a message..."
                                        disabled={
                                            sendingMessage
                                        }
                                        aria-label="Message"
                                    />

                                    <Button
                                        type="submit"
                                        disabled={
                                            sendingMessage ||
                                            !messageText.trim()
                                        }
                                    >
                                        {sendingMessage
                                            ? "Sending..."
                                            : "Send"}
                                    </Button>
                                </Composer>
                            </form>
                        </Content>
                    )}

                {hasAppointment &&
                    activeTab ===
                        "notes" && (
                        <Content>
                            <ContentHeader>
                                <div>
                                    <ContentTitle>
                                        Internal Notes
                                    </ContentTitle>

                                    <ContentSubtitle>
                                        Appointment #
                                        {
                                            appointmentId
                                        }
                                    </ContentSubtitle>
                                </div>

                                {loadedAppointmentId ===
                                    appointmentId && (
                                    <TextButton
                                        type="button"
                                        onClick={() =>
                                            getNotes(
                                                appointmentId
                                            )
                                        }
                                    >
                                        Reload
                                    </TextButton>
                                )}
                            </ContentHeader>

                            {notesError && (
                                <ErrorBox>
                                    {notesError}
                                </ErrorBox>
                            )}

                            {loadingNotes ? (
                                <EmptyState>
                                    <Loader />
                                </EmptyState>
                            ) : sortedNotes.length ===
                              0 ? (
                                <EmptyState>
                                    <EmptyTitle>
                                        No internal notes
                                    </EmptyTitle>

                                    <EmptyText>
                                        No notes have
                                        been added to
                                        this appointment
                                        yet.
                                    </EmptyText>
                                </EmptyState>
                            ) : (
                                <ScrollArea>
                                    {sortedNotes.map(
                                        (
                                            note
                                        ) => (
                                            <NoteCard
                                                key={
                                                    note.id
                                                }
                                            >
                                                <NoteHeader>
                                                    <NoteAuthor>
                                                        {note.author_name ||
                                                            `User #${note.user_id}`}
                                                    </NoteAuthor>

                                                    <NoteDate>
                                                        {formatDateTime(
                                                            note.created_at
                                                        )}
                                                    </NoteDate>
                                                </NoteHeader>

                                                <NoteBody>
                                                    {
                                                        note.content
                                                    }
                                                </NoteBody>
                                            </NoteCard>
                                        )
                                    )}
                                </ScrollArea>
                            )}

                            {canCreateNotes ? (
                                <form
                                    onSubmit={
                                        handleCreateNote
                                    }
                                >
                                    <NoteComposer>
                                        <NoteInput
                                            value={
                                                noteText
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setNoteText(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Write an internal appointment note..."
                                            disabled={
                                                sendingNote
                                            }
                                            aria-label="Internal note"
                                        />

                                        <div>
                                            <Button
                                                type="submit"
                                                disabled={
                                                    sendingNote ||
                                                    !noteText.trim()
                                                }
                                            >
                                                {sendingNote
                                                    ? "Saving..."
                                                    : "Add Internal Note"}
                                            </Button>
                                        </div>
                                    </NoteComposer>
                                </form>
                            ) : (
                                <EmptyState>
                                    <EmptyTitle>
                                        Notes are read-only
                                    </EmptyTitle>

                                    <EmptyText>
                                        Your current role
                                        can view internal
                                        notes but cannot
                                        create them.
                                    </EmptyText>
                                </EmptyState>
                            )}
                        </Content>
                    )}
            </MainCard>
        </PageContainer>
    );
}

export default CommunicationPage;