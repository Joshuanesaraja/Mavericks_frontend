import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    messages: [],

    currentAppointmentId:
        null,

    loadingNotes: false,
    loadingMessages: false,

    sendingNote: false,
    sendingMessage: false,

    error: null,

    notesError: null,
    messagesError: null,

    successMessage: null
};

const extractArray = (
    payload
) => {
    if (!payload) {
        return [];
    }

    if (Array.isArray(payload)) {
        return payload;
    }

    if (
        Array.isArray(
            payload.data
        )
    ) {
        return payload.data;
    }

    if (
        Array.isArray(
            payload.notes
        )
    ) {
        return payload.notes;
    }

    if (
        Array.isArray(
            payload.messages
        )
    ) {
        return payload.messages;
    }

    return [];
};

const extractItem = (
    payload
) => {
    if (!payload) {
        return null;
    }

    if (
        payload.data &&
        !Array.isArray(
            payload.data
        )
    ) {
        return payload.data;
    }

    if (
        payload.note
    ) {
        return payload.note;
    }

    if (
        payload.message &&
        typeof payload.message ===
            "object"
    ) {
        return payload.message;
    }

    return null;
};

const extractMessage = (
    payload,
    fallback
) => {
    if (
        payload &&
        typeof payload.message ===
            "string"
    ) {
        return payload.message;
    }

    return fallback;
};

const chatSlice =
    createSlice({
        name: "chat",

        initialState,

        reducers: {
            fetchNotesRequest(
                state,
                action
            ) {
                state.loadingNotes =
                    true;

                state.notesError =
                    null;

                state.error = null;

                state.currentAppointmentId =
                    Number(
                        action.payload
                    );
            },

            fetchNotesSuccess(
                state,
                action
            ) {
                state.loadingNotes =
                    false;

                state.notes =
                    extractArray(
                        action.payload
                    );

                state.notesError =
                    null;
            },

            fetchNotesFailure(
                state,
                action
            ) {
                state.loadingNotes =
                    false;

                state.notesError =
                    action.payload;

                state.error =
                    action.payload;
            },

            createNoteRequest(
                state
            ) {
                state.sendingNote =
                    true;

                state.error = null;

                state.notesError =
                    null;

                state.successMessage =
                    null;
            },

            createNoteSuccess(
                state,
                action
            ) {
                state.sendingNote =
                    false;

                const note =
                    extractItem(
                        action.payload
                    );

                if (note) {
                    state.notes.push(
                        note
                    );
                }

                state.successMessage =
                    extractMessage(
                        action.payload,
                        "Note created successfully."
                    );

                state.error = null;
            },

            createNoteFailure(
                state,
                action
            ) {
                state.sendingNote =
                    false;

                state.error =
                    action.payload;

                state.notesError =
                    action.payload;

                state.successMessage =
                    null;
            },

            fetchMessagesRequest(
                state,
                action
            ) {
                state.loadingMessages =
                    true;

                state.messagesError =
                    null;

                state.error = null;

                state.currentAppointmentId =
                    Number(
                        action.payload
                    );
            },

            fetchMessagesSuccess(
                state,
                action
            ) {
                state.loadingMessages =
                    false;

                state.messages =
                    extractArray(
                        action.payload
                    );

                state.messagesError =
                    null;
            },

            fetchMessagesFailure(
                state,
                action
            ) {
                state.loadingMessages =
                    false;

                state.messagesError =
                    action.payload;

                state.error =
                    action.payload;
            },

            sendMessageRequest(
                state
            ) {
                state.sendingMessage =
                    true;

                state.error = null;

                state.messagesError =
                    null;

                state.successMessage =
                    null;
            },

            sendMessageSuccess(
                state,
                action
            ) {
                state.sendingMessage =
                    false;

                const message =
                    extractItem(
                        action.payload
                    );

                if (message) {
                    state.messages.push(
                        message
                    );
                }

                state.successMessage =
                    extractMessage(
                        action.payload,
                        "Message sent successfully."
                    );

                state.error = null;
            },

            sendMessageFailure(
                state,
                action
            ) {
                state.sendingMessage =
                    false;

                state.error =
                    action.payload;

                state.messagesError =
                    action.payload;

                state.successMessage =
                    null;
            },

            clearChatError(
                state
            ) {
                state.error = null;

                state.notesError =
                    null;

                state.messagesError =
                    null;
            },

            clearChatSuccess(
                state
            ) {
                state.successMessage =
                    null;
            },

            clearChat(
                state
            ) {
                state.notes = [];

                state.messages = [];

                state.currentAppointmentId =
                    null;

                state.error = null;

                state.notesError =
                    null;

                state.messagesError =
                    null;

                state.successMessage =
                    null;
            }
        }
    });

export const {
    fetchNotesRequest,
    fetchNotesSuccess,
    fetchNotesFailure,

    createNoteRequest,
    createNoteSuccess,
    createNoteFailure,

    fetchMessagesRequest,
    fetchMessagesSuccess,
    fetchMessagesFailure,

    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailure,

    clearChatError,
    clearChatSuccess,
    clearChat
} = chatSlice.actions;

export default chatSlice.reducer;